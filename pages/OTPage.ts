import { Page, Locator } from '@playwright/test';
import * as speakeasy from 'speakeasy';

export class OTPage {
  readonly page: Page;
  readonly codeInput: Locator;
  readonly verifyButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.codeInput = page.getByRole('textbox', { name: 'Código de verificação de 6 dí' });
    this.verifyButton = page.getByRole('button', { name: 'Verificar código de autentica' });
  }

  generateTOTPCode(secret: string): string {
    const token = speakeasy.totp({
      secret: secret,
      encoding: 'base32'
    });
    return token;
  }

  async verifyTwoFactorCode(secret: string) {
    const code = this.generateTOTPCode(secret);
    await this.codeInput.fill(code);
    await this.verifyButton.click();
  }
}
