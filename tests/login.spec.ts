import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginpage';

test.describe('Login', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    await page.goto('https://app.avaliei.com.br/login');
    loginPage = new LoginPage(page);
  });

  test('deve fazer login com sucesso', async ({ page }) => {
    await loginPage.login('e2e-super-teacher-22@example.com', 'password');

  });
});
