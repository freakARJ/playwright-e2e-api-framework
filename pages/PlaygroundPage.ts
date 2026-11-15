import { Page, Locator, FrameLocator } from '@playwright/test';
import { BasePage } from './BasePage';

export class PlaygroundPage extends BasePage {
  // Header & Reset
  readonly resetButton: Locator;

  // 1. Form Inputs
  readonly fullNameInput: Locator;
  readonly tokenInput: Locator;
  readonly toggleTokenButton: Locator;
  readonly releaseDateInput: Locator;
  readonly fileInput: Locator;
  readonly fileStatus: Locator;
  readonly submitFormButton: Locator;
  readonly formResult: Locator;

  // 2. Selections & Actions
  readonly browserSelect: Locator;
  readonly suiteCombo: Locator;
  readonly suiteList: Locator;
  readonly selectResult: Locator;
  readonly dblClickButton: Locator;
  readonly rightClickButton: Locator;
  readonly hoverButton: Locator;
  readonly hoverTooltip: Locator;
  readonly actionResult: Locator;
  readonly dragSource: Locator;
  readonly dropTarget: Locator;

  // 3. Complex Structures
  readonly tableBody: Locator;
  readonly tableRows: Locator;
  readonly prevPageButton: Locator;
  readonly nextPageButton: Locator;
  readonly pageInfo: Locator;
  readonly qaFrame: FrameLocator;
  readonly frameMessage: Locator;
  readonly frameButton: Locator;
  readonly shadowInput: Locator;
  readonly shadowVerifyButton: Locator;
  readonly shadowOutput: Locator;
  readonly openModalButton: Locator;
  readonly modalDialog: Locator;
  readonly confirmModalButton: Locator;
  readonly cancelModalButton: Locator;
  readonly closeModalButton: Locator;
  readonly modalStatus: Locator;

  // 4. Dialogs, Tabs & Async
  readonly alertButton: Locator;
  readonly confirmButton: Locator;
  readonly promptButton: Locator;
  readonly dialogResult: Locator;
  readonly newTabLink: Locator;
  readonly popupButton: Locator;
  readonly asyncButton: Locator;
  readonly asyncResult: Locator;

  constructor(page: Page) {
    super(page);

    this.resetButton = page.locator('#reset-pg');

    // 1. Form Inputs
    this.fullNameInput = page.getByTestId('input-fullname');
    this.tokenInput = page.locator('#pw-token');
    this.toggleTokenButton = page.locator('#toggle-token');
    this.releaseDateInput = page.locator('input[name="rdate"]');
    this.fileInput = page.locator('#file-in');
    this.fileStatus = page.getByTestId('file-status');
    this.submitFormButton = page.getByRole('button', { name: 'Submit Form' });
    this.formResult = page.getByTestId('form-result');

    // 2. Selections & Actions
    this.browserSelect = page.locator('#browser-sel');
    this.suiteCombo = page.locator('#suite-combo');
    this.suiteList = page.locator('#suite-list');
    this.selectResult = page.getByTestId('select-result');
    this.dblClickButton = page.locator('#dbl-btn');
    this.rightClickButton = page.locator('#ctx-btn');
    this.hoverButton = page.locator('#hover-btn');
    this.hoverTooltip = page.locator('#hover-tip');
    this.actionResult = page.getByTestId('action-result');
    this.dragSource = page.getByTestId('drag-source');
    this.dropTarget = page.getByTestId('drop-target');

    // 3. Complex Structures
    this.tableBody = page.locator('#tbl-body');
    this.tableRows = page.locator('#tbl-body tr');
    this.prevPageButton = page.locator('#prev-page');
    this.nextPageButton = page.locator('#next-page');
    this.pageInfo = page.locator('#page-info');
    this.qaFrame = page.frameLocator('iframe[title="Embedded QA Frame"]');
    this.frameMessage = this.qaFrame.locator('#f-msg');
    this.frameButton = this.qaFrame.locator('#f-btn');
    // Playwright automatically pierces open Shadow DOM
    this.shadowInput = page.locator('#shadow-host #s-in');
    this.shadowVerifyButton = page.locator('#shadow-host #s-btn');
    this.shadowOutput = page.locator('#shadow-host #s-out');
    this.openModalButton = page.locator('#open-modal');
    this.modalDialog = page.getByRole('dialog');
    this.confirmModalButton = page.locator('#confirm-modal');
    this.cancelModalButton = page.locator('#cancel-modal');
    this.closeModalButton = page.locator('#close-modal');
    this.modalStatus = page.locator('#modal-status');

    // 4. Dialogs, Tabs & Async
    this.alertButton = page.locator('#alert-btn');
    this.confirmButton = page.locator('#confirm-btn');
    this.promptButton = page.locator('#prompt-btn');
    this.dialogResult = page.getByTestId('dialog-result');
    this.newTabLink = page.getByRole('link', { name: 'Open Projects in New Tab' });
    this.popupButton = page.locator('#popup-btn');
    this.asyncButton = page.locator('#async-btn');
    this.asyncResult = page.getByTestId('async-result');
  }

  async open(): Promise<void> {
    await this.goto('/playground.html');
  }

  async selectEnvironment(env: 'Staging' | 'QA Sandbox' | 'Production'): Promise<void> {
    await this.page.getByRole('radio', { name: env }).check();
  }

  async selectTestTypes(types: Array<'Smoke' | 'Regression' | 'API'>): Promise<void> {
    for (const t of types) {
      await this.page.getByRole('checkbox', { name: t }).check();
    }
  }

  async selectSearchableSuite(query: string, optionText: string): Promise<void> {
    await this.suiteCombo.click();
    await this.suiteCombo.fill(query);
    await this.suiteList.getByRole('option', { name: optionText }).dispatchEvent('mousedown');
  }

  async sortTableBy(column: 'name' | 'status' | 'priority'): Promise<void> {
    await this.page.locator(`button[data-sort="${column}"]`).click();
  }
}