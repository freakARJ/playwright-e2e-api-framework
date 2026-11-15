import { Page, Locator } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(path: string): Promise<void> {
    await this.page.goto(path, { waitUntil: 'domcontentloaded' });
  }

  async getTitle(): Promise<string> {
    return this.page.title();
  }

  get statusLog(): Locator {
    return this.page.locator('#pw-log');
  }
}