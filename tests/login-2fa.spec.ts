import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginpage';

test.describe('Login com 2FA', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    await page.goto('https://app.avaliei.com.br/login');
    loginPage = new LoginPage(page);
  });

  test('deve fazer login com sucesso (sem 2FA)', async ({ page }) => {
    await loginPage.login('e2e-super-teacher-22@example.com', 'password');
    // await expect(page).toHaveURL(/.*dashboard/);
  });

  test('deve fazer login com 2FA', async ({ page }) => {
    // Insira seu secret aqui
    const secret = '6ZOY27LY3JVDWXOX4526NPAZDFQBOGUP'; 
    
    await loginPage.loginWith2FA(
      'e2e-super-teacher-22@example.com', 
      'password',
      secret
    );
    
    // await expect(page).toHaveURL(/.*dashboard/);
  });
});
