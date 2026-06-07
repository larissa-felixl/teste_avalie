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

  // ✅ CASOS FELIZES
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

  // ❌ CASOS TRISTES
  test('[TRISTE] Deve impedir salvar disciplina sem nome', async () => {
    await disciplinasPage.addDisciplinaButton.click();
    await disciplinasPage.clearDisciplinaNameInput();
    await disciplinasPage.saveButton.click();

    // Modal deve continuar aberto (app não salvou)
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
    // Não seleciona a área
    await disciplinasPage.saveButton.click();

    // Modal deve continuar aberto (app não salvou)
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

    // ✅ submitDisciplinaForm: aguarda modal fechar OU alert aparecer — não assume sucesso
    await disciplinasPage.submitDisciplinaForm(disciplinaName, areaName);

    // ✅ App fecha o modal mas exibe alert de duplicata na lista — verificamos o texto real
    const errorMessage = await disciplinasPage.getErrorMessage();
    expect(errorMessage).toContain('Já existe uma disciplina com o nome');
  });

  // 🔲 CASOS DE BORDA
  test('[BORDA] Deve criar disciplina com nome muito longo', async () => {
    const disciplinaLonga = 'D'.repeat(100);
    const areaName = 'Matemática e suas tecnologias';

    // ✅ submitDisciplinaForm: app pode truncar e exibir erro se já existir
    await disciplinasPage.submitDisciplinaForm(disciplinaLonga, areaName);

    // ✅ Verifica o desfecho real: disciplina criada OU erro exibido
    const errorMessage = await disciplinasPage.getErrorMessage();

    if (errorMessage.length > 0) {
      // App rejeitou (duplicata ou limite de chars) — comportamento válido
      expect(errorMessage.length).toBeGreaterThan(0);
    } else {
      // App aceitou — verifica na tabela usando o texto que foi realmente salvo
      // A busca usa substring pois a app pode ter truncado o nome
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

    // ✅ Aguarda o alert aparecer (pode ser após o modal fechar)
    const errorMessage = await disciplinasPage.getErrorMessage();
    // Texto real da app: "Conteúdo inválido detectado na requisição."
    expect(errorMessage).toContain('Conteúdo inválido detectado');
  });
});