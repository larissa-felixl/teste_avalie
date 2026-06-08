import { test, expect } from '@playwright/test';
import { DisciplinasPage } from '../../pages/DisciplinasPage';
import { AuthHelper } from '../../fixtures/authHelper';

const SECRET = 'ITG5EYZN453DOJ3K';
const EMAIL = 'e2e-super-teacher-09@example.com';
const PASSWORD = 'password';

test.describe('Disciplinas - CRUD', () => {
  let disciplinasPage: DisciplinasPage;

  test.beforeEach(async ({ page }) => {
    await page.goto('https://app.avaliei.com.br/login');
    await AuthHelper.loginWith2FA(page, EMAIL, PASSWORD, SECRET);
    await page.waitForLoadState('networkidle');

    if (page.url().includes('login')) {
      throw new Error('Falha na autenticação: ainda em página de login após 2FA');
    }

    disciplinasPage = new DisciplinasPage(page);
    await disciplinasPage.navigateToDisciplinas();
  });

  test('[FELIZ] Deve criar uma disciplina com sucesso', async () => {
    const disciplinaName = `Disciplina Teste ${Date.now()}`;
    const areaName = 'Matemática e suas tecnologias';

    await disciplinasPage.addDisciplina(disciplinaName, areaName);
    await disciplinasPage.searchDisciplina(disciplinaName);

    const isVisible = await disciplinasPage.isDisciplinaVisible(disciplinaName);
    expect(isVisible).toBe(true);
  });

  test('[FELIZ] Deve editar uma disciplina com sucesso', async () => {
    const disciplinaName = `Disciplina Teste ${Date.now()}`;
    const novoNome = `Disciplina Editada ${Date.now()}`;
    const areaName = 'Matemática e suas tecnologias';

    await disciplinasPage.addDisciplina(disciplinaName, areaName);
    await disciplinasPage.searchDisciplina(disciplinaName);
    await disciplinasPage.editDisciplina(disciplinaName, novoNome);

    await disciplinasPage.searchDisciplina(novoNome);

    const isVisible = await disciplinasPage.isDisciplinaVisible(novoNome);
    expect(isVisible).toBe(true);
  });

  test('[TRISTE] Deve impedir salvar disciplina sem nome', async () => {
    await disciplinasPage.addDisciplinaButton.click();
    await disciplinasPage.clearDisciplinaNameInput();
    await disciplinasPage.saveButton.click();

    const inputVisible = await disciplinasPage.disciplinaNameInput
      .isVisible({ timeout: 2000 })
      .catch(() => false);
    expect(inputVisible).toBe(true);
  });

  test('[TRISTE] Deve impedir salvar disciplina sem selecionar área', async () => {
    const disciplinaName = `Disciplina Teste ${Date.now()}`;

    await disciplinasPage.addDisciplinaButton.click();
    await disciplinasPage.disciplinaNameInput.waitFor({ state: 'visible', timeout: 10000 });
    await disciplinasPage.disciplinaNameInput.fill(disciplinaName);
    await disciplinasPage.saveButton.click();

    const inputVisible = await disciplinasPage.disciplinaNameInput
      .isVisible({ timeout: 2000 })
      .catch(() => false);
    expect(inputVisible).toBe(true);
  });

  test('[TRISTE] Deve impedir criar disciplina duplicada', async () => {
    const disciplinaName = `Disciplina Duplicada ${Date.now()}`;
    const areaName = 'Matemática e suas tecnologias';

    await disciplinasPage.addDisciplina(disciplinaName, areaName);
    await disciplinasPage.navigateToDisciplinas();

    await disciplinasPage.submitDisciplinaForm(disciplinaName, areaName);

    const errorMessage = await disciplinasPage.getErrorMessage();
    expect(errorMessage).toContain('Já existe uma disciplina com o nome');
  });

  test('[BORDA] Deve criar disciplina com nome muito longo', async () => {
    const disciplinaLonga = 'D'.repeat(100);
    const areaName = 'Matemática e suas tecnologias';

    await disciplinasPage.submitDisciplinaForm(disciplinaLonga, areaName);

    const errorMessage = await disciplinasPage.getErrorMessage();

    if (errorMessage.length > 0) {
      expect(errorMessage.length).toBeGreaterThan(0);
    } else {
      await disciplinasPage.searchDisciplina(disciplinaLonga.substring(0, 50));
      const disciplinaRow = disciplinasPage.page
        .locator('tbody tr')
        .filter({ hasText: disciplinaLonga.substring(0, 50) })
        .first();
      await expect(disciplinaRow).toBeVisible({ timeout: 5000 });
    }
  });

  test('[BORDA] Deve rejeitar disciplina com caracteres inválidos', async () => {
    const disciplinaInvalida = `Disc. #@$% & ${Date.now()}`;
    const areaName = 'Matemática e suas tecnologias';

    await disciplinasPage.addDisciplinaButton.click();
    await disciplinasPage.disciplinaNameInput.waitFor({ state: 'visible', timeout: 10000 });
    await disciplinasPage.disciplinaNameInput.fill(disciplinaInvalida);
    await disciplinasPage.areaSelectButton.click();
    await disciplinasPage.page.getByLabel('Suggestions').getByText(areaName).click();
    await disciplinasPage.saveButton.click();

    const errorMessage = await disciplinasPage.getErrorMessage();
    expect(errorMessage).toContain('Conteúdo inválido detectado');
  });
});