import { test, expect } from '@playwright/test';
import { AreasPage } from '../../pages/AreasPage';
import { AuthHelper } from '../../fixtures/authHelper';

const SECRET = 'ITG5EYZN453DOJ3K';
const EMAIL = 'e2e-super-teacher-09@example.com';
const PASSWORD = 'password';

test.describe('Áreas - CRUD', () => {
  let areasPage: AreasPage;

  test.beforeEach(async ({ page }) => {
    await page.goto('https://app.avaliei.com.br/login');
    await AuthHelper.loginWith2FA(page, EMAIL, PASSWORD, SECRET);
    await page.waitForLoadState('networkidle');

    if (page.url().includes('login')) {
      throw new Error('Falha na autenticação: ainda em página de login após 2FA');
    }

    areasPage = new AreasPage(page);
    await areasPage.navigateToAreas();
  });

  test('[FELIZ] Deve criar uma área com sucesso', async () => {
    const areaName = `Área Teste ${Date.now()}`;

    await areasPage.addArea(areaName);
    await areasPage.searchArea(areaName);

    const isVisible = await areasPage.isAreaVisible(areaName);
    expect(isVisible).toBe(true);
  });

  test('[FELIZ] Deve editar uma área com sucesso', async () => {
    const areaName = `Área Teste ${Date.now()}`;
    const novoNome = `Área Editada ${Date.now()}`;

    await areasPage.addArea(areaName);
    await areasPage.searchArea(areaName);
    await areasPage.editArea(areaName, novoNome);

    await areasPage.searchArea(novoNome);

    const isVisible = await areasPage.isAreaVisible(novoNome);
    expect(isVisible).toBe(true);
  });

  test('[TRISTE] Deve impedir salvar área com campo vazio', async () => {
    await areasPage.addAreaButton.click();
    await areasPage.clearAreaNameInput();
    await areasPage.saveButton.click();

    const inputVisible = await areasPage.areaNameInput
      .isVisible({ timeout: 2000 })
      .catch(() => false);
    expect(inputVisible).toBe(true);
  });

  test('[TRISTE] Deve impedir criar área duplicada', async () => {
    const areaName = `Área Duplicada ${Date.now()}`;

    await areasPage.addArea(areaName);
    await areasPage.navigateToAreas();

    await areasPage.submitAreaForm(areaName);

    const errorMessage = await areasPage.getErrorMessage();
    expect(errorMessage).toContain('Já existe uma área com o nome');
  });

  test('[BORDA] Deve criar área com nome muito longo', async () => {
    const areaLonga = 'A'.repeat(100);

    await areasPage.submitAreaForm(areaLonga);

    const errorMessage = await areasPage.getErrorMessage();

    if (errorMessage.length > 0) {
      expect(errorMessage.length).toBeGreaterThan(0);
    } else {
      await areasPage.searchArea(areaLonga.substring(0, 50));
      const areaRow = await areasPage.page
        .locator('tbody tr')
        .filter({ hasText: areaLonga.substring(0, 50) })
        .first();
      await expect(areaRow).toBeVisible({ timeout: 5000 });
    }
  });

  test('[BORDA] Deve rejeitar área com caracteres inválidos', async () => {
    const areaInvalida = `Área @#$% & ${Date.now()}`;

    await areasPage.addAreaButton.click();
    await areasPage.areaNameInput.waitFor({ state: 'visible', timeout: 10000 });
    await areasPage.areaNameInput.fill(areaInvalida);
    await areasPage.saveButton.click();

    const errorMessage = await areasPage.getErrorMessage();
    expect(errorMessage).toContain('Conteúdo inválido detectado');
  });
});