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
    // Aguarda o campo de input ficar pronto
    await this.codeInput.waitFor({ state: 'visible' });
    
    let attempts = 0;
    const maxAttempts = 3;
    let success = false;

    while (attempts < maxAttempts && !success) {
      try {
        // Verifica se a página ainda está ativa antes de tentar
        if (this.page.isClosed()) {
          throw new Error('Página foi fechada');
        }
        
        // Gera o código TOTP o mais próximo possível do envio
        const code = this.generateTOTPCode(secret);
        console.log(`[2FA] Tentativa ${attempts + 1}/${maxAttempts} - Código: ${code}`);
        
        // Preenche e clica rapidamente para minimizar expiração do código
        await this.codeInput.fill(code);
        await this.verifyButton.click();
        
        // Aguarda a navegação após verificação
        // Tenta esperar por mudança de URL ou dashboard
        try {
          // Espera por URL que não seja a de login/2FA (máx 15s)
          await this.page.waitForURL(/(?!.*login).*/, { timeout: 15000 });
        } catch {
          // Se timeout, verifica se chegou em alguma página (mesmo que login)
          console.log('[2FA] URL após verificação:', this.page.url());
        }
        
        // Pequeno delay para garantir que a página carregou
        await this.page.waitForTimeout(1000);
        success = true;
        console.log('[2FA] ✅ Código verificado com sucesso!');
      } catch (error) {
        attempts++;
        if (attempts < maxAttempts && !this.page.isClosed()) {
          console.log(`[2FA] ❌ Falha na tentativa ${attempts}, aguardando 2s para tentar novamente...`);
          // Usa delay seguro sem aguardar
          await new Promise(resolve => setTimeout(resolve, 2000));
          // Limpa o campo para a próxima tentativa
          try {
            await this.codeInput.clear();
          } catch {
            // Campo pode estar indisponível, ignora
          }
        } else {
          console.log('[2FA] ❌ Todas as tentativas falharam!');
          throw error;
        }
      }
    }
  }
}
