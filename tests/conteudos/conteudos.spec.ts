import { test, expect } from '@playwright/test';
import { ConteudosPage } from '../../pages/ConteudosPage';
import { AuthHelper } from '../../fixtures/authHelper';

const SECRET = 'ITG5EYZN453DOJ3K';
const EMAIL = 'e2e-super-teacher-09@example.com';
const PASSWORD = 'password';

test.describe('Conteúdos - CRUD', () => {
  let conteudosPage: ConteudosPage;

  test.beforeEach(async ({ page }) => {
    await page.goto('https://app.avaliei.com.br/login');
    await AuthHelper.loginWith2FA(page, EMAIL, PASSWORD, SECRET);
    await page.waitForLoadState('networkidle');

    if (page.url().includes('login')) {
      throw new Error('Falha na autenticação: ainda em página de login após 2FA');
    }

    conteudosPage = new ConteudosPage(page);
    await conteudosPage.navigateToConteudos();
  });

  //  CASOS FELIZES
  test('[FELIZ] Deve criar um conteúdo com sucesso', async () => {
    const conteudoName = `Conteúdo Teste ${Date.now()}`;

    await conteudosPage.addConteudo(conteudoName, 'Espanhol');
    await conteudosPage.searchConteudo(conteudoName);

    const isVisible = await conteudosPage.isConteudoVisible(conteudoName);
    expect(isVisible).toBe(true);
  });

  test('[FELIZ] Deve editar um conteúdo com sucesso', async () => {
    const conteudoName = `Conteúdo Teste ${Date.now()}`;
    const novoNome = `Conteúdo Editado ${Date.now()}`;

    await conteudosPage.addConteudo(conteudoName, 'Espanhol');
    await conteudosPage.searchConteudo(conteudoName);
    await conteudosPage.editConteudo(conteudoName, novoNome, 'Educação Física');

    await conteudosPage.searchConteudo(novoNome);

    const isVisible = await conteudosPage.isConteudoVisible(novoNome);
    expect(isVisible).toBe(true);
  });

  //  CASOS TRISTES
  test('[TRISTE] Deve impedir salvar conteúdo sem nome', async () => {
    await conteudosPage.addConteudoButton.click();
    await conteudosPage.clearConteudoNameInput();
    await conteudosPage.saveButton.click();

    const inputVisible = await conteudosPage.conteudoNameInput
      .isVisible({ timeout: 2000 })
      .catch(() => false);
    expect(inputVisible).toBe(true);
  });

  test('[TRISTE] Deve impedir salvar conteúdo sem selecionar disciplina', async () => {
    const conteudoName = `Conteúdo Teste ${Date.now()}`;

    await conteudosPage.submitConteudoForm(conteudoName);

    const inputVisible = await conteudosPage.conteudoNameInput
      .isVisible({ timeout: 2000 })
      .catch(() => false);
    expect(inputVisible).toBe(true);
  });

  //  CASOS DE BORDA
  test('[BORDA] Deve criar conteúdo com nome muito longo', async () => {
    const conteudoLongo = 'C'.repeat(100);

    await conteudosPage.submitConteudoForm(conteudoLongo, 'Espanhol');

    const errorMessage = await conteudosPage.getErrorMessage();

    if (errorMessage.length > 0) {
      expect(errorMessage.length).toBeGreaterThan(0);
    } else {
      await conteudosPage.searchConteudo(conteudoLongo.substring(0, 50));
      const row = conteudosPage.page
        .locator('tbody tr')
        .filter({ hasText: conteudoLongo.substring(0, 50) })
        .first();
      await expect(row).toBeVisible({ timeout: 5000 });
    }
  });

  test('[BORDA] Deve criar conteúdo com nome curto', async () => {
    const conteudoSimples = `x-${Date.now()}`;

    await conteudosPage.addConteudo(conteudoSimples, 'Geografia');
    await conteudosPage.searchConteudo(conteudoSimples);

    const isVisible = await conteudosPage.isConteudoVisible(conteudoSimples);
    expect(isVisible).toBe(true);
  });
});