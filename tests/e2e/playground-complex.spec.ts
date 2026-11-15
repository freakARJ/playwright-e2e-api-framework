import { test, expect } from '@playwright/test';
import { PlaygroundPage } from '../../pages/PlaygroundPage';

test.describe('Playground - Complex Structures', () => {
  let pg: PlaygroundPage;

  test.beforeEach(async ({ page }) => {
    pg = new PlaygroundPage(page);
    await pg.open();
  });

  test('paginates and sorts the test runs table', async () => {
    await expect(pg.tableRows).toHaveCount(3);
    await expect(pg.pageInfo).toHaveText('Page 1 of 2');
    await expect(pg.prevPageButton).toBeDisabled();

    await pg.nextPageButton.click();
    await expect(pg.pageInfo).toHaveText('Page 2 of 2');
    await expect(pg.nextPageButton).toBeDisabled();

    await pg.prevPageButton.click();
    await pg.sortTableBy('name'); // toggles to descending
    await expect(pg.tableRows.first()).toContainText('Profile Edit');
  });

  test('interacts with element inside embedded iframe', async () => {
    await expect(pg.frameMessage).toHaveText('Frame ready');
    await pg.frameButton.click();
    await expect(pg.frameMessage).toHaveText('Frame button clicked!');
  });

  test('interacts with Shadow DOM input and button', async () => {
    await pg.shadowInput.fill('Playwright Shadow');
    await pg.shadowVerifyButton.click();
    await expect(pg.shadowOutput).toHaveText('Verified: Playwright Shadow');
  });

  test('opens and confirms the accessible modal dialog', async () => {
    await pg.openModalButton.click();
    await expect(pg.modalDialog).toBeVisible();
    await expect(pg.modalStatus).toHaveText('Modal open');

    await pg.confirmModalButton.click();
    await expect(pg.modalDialog).toBeHidden();
    await expect(pg.modalStatus).toHaveText('Modal confirmed!');
  });
});