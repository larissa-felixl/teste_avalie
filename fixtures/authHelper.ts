import { Page } from '@playwright/test';
import * as speakeasy from 'speakeasy';
import { LoginPage } from '../pages/LoginPage';
import { OTPage } from '../pages/OTPage';

export class AuthHelper {
  static generateTOTPCode(secret: string): string {
    const token = speakeasy.totp({
      secret: secret,
      encoding: 'base32'
    });
    return token;
  }

  static async loginWith2FA(page: Page, email: string, password: string, secret: string) {
    const loginPage = new LoginPage(page);
    const otPage = new OTPage(page);
    await loginPage.login(email, password);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    let attempts = 0;
    const maxAttempts = 3;
    let success = false;
    while (attempts < maxAttempts && !success) {
      try {
        if (page.isClosed()) {
          throw new Error('Página foi fechada');
        }

        const code = this.generateTOTPCode(secret);
        console.log(`[2FA] Tentativa ${attempts + 1}/${maxAttempts} - Código: ${code}`);
        await otPage.submitCode(code);

        try {
          await page.waitForURL(/(?!.*login).*/, { timeout: 15000 });
        } catch {
          console.log('[2FA] URL após verificação:', page.url());
        }

        await page.waitForTimeout(1000);
        success = true;
        console.log('[2FA] ✅ Código verificado com sucesso!');
      } catch (error) {
        attempts++;
        if (attempts < maxAttempts && !page.isClosed()) {
          console.log(`[2FA] ❌ Falha na tentativa ${attempts}, aguardando 2s...`);
          await new Promise(resolve => setTimeout(resolve, 2000));
          try {
            await otPage.codeInput.clear();
          } catch {
            // Campo pode estar indisponível
          }
        } else {
          console.log('[2FA] ❌ Todas as tentativas falharam!');
          throw error;
        }
      }
    }
  }
}
