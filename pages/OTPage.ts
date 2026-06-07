import { Page, Locator } from '@playwright/test';

export class OTPage {
  readonly page: Page;
  readonly codeInput: Locator;
  readonly verifyButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.codeInput = page.getByRole('textbox', { name: 'Código de verificação de 6 dí' });
    this.verifyButton = page.getByRole('button', { name: 'Verificar código de autentica' });
  }

  async fillCode(code: string) {
    await this.codeInput.waitFor({ state: 'visible' });
    await this.codeInput.fill(code);
  }

  async clickVerify() {
    await this.verifyButton.click();
  }

  async submitCode(code: string) {
    await this.fillCode(code);
    await this.clickVerify();
  }
}
