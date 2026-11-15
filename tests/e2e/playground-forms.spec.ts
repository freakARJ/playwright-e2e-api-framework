import { test, expect } from '@playwright/test';
import { PlaygroundPage } from '../../pages/PlaygroundPage';

test.describe('Playground - Form Inputs', () => {
  let pg: PlaygroundPage;

  test.beforeEach(async ({ page }) => {
    pg = new PlaygroundPage(page);
    await pg.open();
  });

  test('submits full name, environment, test types, and release date', async () => {
    await pg.fullNameInput.fill('Arifur Rahman');
    await pg.selectEnvironment('QA Sandbox');
    await pg.selectTestTypes(['Smoke', 'API']);
    await pg.releaseDateInput.fill('2026-05-01');
    await pg.submitFormButton.click();

    await expect(pg.formResult).toContainText('Submitted: Arifur Rahman | QA Sandbox | Smoke, API | 2026-05-01');
    await expect(pg.statusLog).toContainText('Arifur Rahman');
  });

  test('toggles secret token visibility', async () => {
    await pg.tokenInput.fill('qa-secret-123');
    await expect(pg.tokenInput).toHaveAttribute('type', 'password');

    await pg.toggleTokenButton.click();
    await expect(pg.tokenInput).toHaveAttribute('type', 'text');
    await expect(pg.toggleTokenButton).toHaveText('Hide');
    await expect(pg.toggleTokenButton).toHaveAttribute('aria-pressed', 'true');
  });

  test('uploads an in-memory test log file', async () => {
    await pg.fileInput.setInputFiles({
      name: 'smoke-run.log',
      mimeType: 'text/plain',
      buffer: Buffer.from('PASS: all checks green\n'),
    });

    await expect(pg.fileStatus).toContainText('Selected: smoke-run.log');
  });
});