import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginpage';

const SECRET = 'TH7ZROBLTKYA2WAX';
const EMAIL = 'e2e-super-teacher-22@example.com';
const PASSWORD = 'password';

test.describe('Debug 2FA', () => {
  test('Debug - Verificar 2FA', async ({ page }) => {
    await page.goto('https://app.avaliei.com.br/login');
    
    // Screenshot antes do login
    await page.screenshot({ path: 'debug-before-login.png' });
    
    // Fazer login
    const loginPage = new LoginPage(page);
    await loginPage.login(EMAIL, PASSWORD);
    
    // Aguardar um pouco e capturar screenshot
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'debug-after-login.png' });
    
    // Verificar se está na página de 2FA
    const codeInput = page.getByRole('textbox', { name: /Código de verificação/ });
    const exists = await codeInput.count();
    console.log('Input de código encontrado:', exists > 0);
    
    if (exists > 0) {
      await page.screenshot({ path: 'debug-2fa-found.png' });
      console.log('✅ Input de 2FA encontrado!');
    } else {
      console.log('❌ Input de 2FA NÃO encontrado');
      // Tentar com outros seletores
      const inputs = page.locator('input[type="text"]');
      const count = await inputs.count();
      console.log('Total de inputs de texto:', count);
      
      const textboxes = page.getByRole('textbox');
      const textboxCount = await textboxes.count();
      console.log('Total de textboxes:', textboxCount);
      
      // Listar todos os textboxes
      for (let i = 0; i < Math.min(textboxCount, 5); i++) {
        const label = await textboxes.nth(i).getAttribute('aria-label');
        console.log(`Textbox ${i}:`, label);
      }
    }
  });
});
