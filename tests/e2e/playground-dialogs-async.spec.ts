import { test, expect } from '@playwright/test';
import { PlaygroundPage } from '../../pages/PlaygroundPage';

test.describe('Playground - Dialogs, Tabs, Async & Reset', () => {
  let pg: PlaygroundPage;

  test.beforeEach(async ({ page }) => {
    pg = new PlaygroundPage(page);
    await pg.open();
  });

  test('handles alert, confirm, and prompt browser dialogs', async ({ page }) => {
    page.once('dialog', async (dialog) => {
      expect(dialog.type()).toBe('alert');
      await dialog.accept();
    });
    await pg.alertButton.click();
    await expect(pg.dialogResult).toHaveText('Alert closed');

    page.once('dialog', async (dialog) => {
      expect(dialog.type()).toBe('confirm');
      await dialog.dismiss();
    });
    await pg.confirmButton.click();
    await expect(pg.dialogResult).toHaveText('Confirm result: Dismissed');

    page.once('dialog', async (dialog) => {
      expect(dialog.type()).toBe('prompt');
      await dialog.accept('QA-DE');
    });
    await pg.promptButton.click();
    await expect(pg.dialogResult).toHaveText('Prompt result: QA-DE');
  });

  test('catches new tab and popup window', async ({ page, context }) => {
    const [projectsTab] = await Promise.all([
      context.waitForEvent('page'),
      pg.newTabLink.click(),
    ]);
    await projectsTab.waitForLoadState('domcontentloaded');
    await expect(projectsTab).toHaveURL(/projects\.html/);
    await projectsTab.close();

    const [popup] = await Promise.all([
      page.waitForEvent('popup'),
      pg.popupButton.click(),
    ]);
    await expect(popup.locator('h1')).toHaveText('Popup Tab Opened');
    await popup.close();
  });

  test('auto-waits for async API simulation and resets playground', async () => {
    await pg.asyncButton.click();
    await expect(pg.asyncResult).toHaveText('Loading...');
    await expect(pg.asyncResult).toHaveText('200 OK — Payload verified after delay', {
      timeout: 5000,
    });

    await pg.resetButton.click();
    await expect(pg.asyncResult).toHaveText('Idle — click to simulate a 1.8s API delay');
    await expect(pg.statusLog).toHaveText('Playground reset.');
  });
});