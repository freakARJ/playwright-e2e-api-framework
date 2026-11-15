import { test, expect } from '@playwright/test';
import { PlaygroundPage } from '../../pages/PlaygroundPage';

test.describe('Playground - Selections & Mouse Actions', () => {
  let pg: PlaygroundPage;

  test.beforeEach(async ({ page }) => {
    pg = new PlaygroundPage(page);
    await pg.open();
  });

  test('selects browser from native dropdown and suite from searchable combobox', async () => {
    await pg.browserSelect.selectOption('firefox');
    await expect(pg.selectResult).toHaveText('Browser selected: firefox');

    await pg.selectSearchableSuite('API', 'API Regression');
    await expect(pg.selectResult).toHaveText('Suite selected: API Regression');
  });

  test('handles double-click, right-click, and hover tooltip', async () => {
    await pg.dblClickButton.dblclick();
    await expect(pg.actionResult).toHaveText('Double-click detected!');

    await pg.rightClickButton.click({ button: 'right' });
    await expect(pg.actionResult).toHaveText('Right-click detected!');

    await pg.hoverButton.hover();
    await expect(pg.hoverTooltip).toBeVisible();
    await expect(pg.hoverTooltip).toHaveText('Tooltip visible!');
  });

  test('drags bug ticket into verification drop zone', async () => {
    await pg.dragSource.dragTo(pg.dropTarget);
    await expect(pg.dropTarget).toHaveText('Dropped: Bug Ticket #404');
    await expect(pg.dropTarget).toHaveClass(/done/);
  });
});