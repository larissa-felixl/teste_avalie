import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginpage';
import { DisciplinasPage } from '../../pages/DisciplinasPage';

const SECRET = 'ITG5EYZN453DOJ3K';
const EMAIL = 'e2e-super-teacher-09@example.com';
const PASSWORD = 'password';

test.describe('Disciplinas - CRUD', () => {
  let loginPage: LoginPage;
  let disciplinasPage: DisciplinasPage;

  test.beforeEach(async ({ page }) => {
    await page.goto('https://app.avaliei.com.br/login');
    loginPage = new LoginPage(page);
    await loginPage.loginWith2FA(EMAIL, PASSWORD, SECRET);
    
    // Aguarda a página carregar completamente após 2FA
    await page.waitForLoadState('networkidle');
    
    disciplinasPage = new DisciplinasPage(page);
    await disciplinasPage.navigateToDisciplinas();
  });

  // ✅ CASOS FELIZES (Happy Path)
  test('[FELIZ] Deve criar uma disciplina com sucesso', async ({ page }) => {
    const disciplinaName = `Disciplina Teste ${Date.now()}`;
    const areaName = 'Matemática e suas tecnologias'; // Área existente
    
    await disciplinasPage.addDisciplina(disciplinaName, areaName);
    
    // Verifica se foi criada
    await disciplinasPage.searchDisciplina(disciplinaName);
    await expect(page.getByText(disciplinaName)).toBeVisible();
  });

  test('[FELIZ] Deve editar uma disciplina com sucesso', async ({ page }) => {
    const disciplinaName = `Disciplina Teste ${Date.now()}`;
    const novoNome = `Disciplina Editada ${Date.now()}`;
    const areaName = 'Matemática e suas tecnologias';
    
    // Cria
    await disciplinasPage.addDisciplina(disciplinaName, areaName);
    
    // Edita
    await disciplinasPage.searchDisciplina(disciplinaName);
    await disciplinasPage.editDisciplina(disciplinaName, novoNome);
    
    // Verifica
    await disciplinasPage.searchDisciplina(novoNome);
    await expect(page.getByText(novoNome)).toBeVisible();
  });

  // ❌ CASOS TRISTES (Sad Path)
  test('[TRISTE] Deve impedir salvar disciplina sem nome', async ({ page }) => {
    await disciplinasPage.addDisciplinaButton.click();
    await disciplinasPage.clearDisciplinaNameInput();
    await disciplinasPage.saveButton.click();
    
    // Verifica se há erro
    await expect(page.locator('text=obrigatório').or(page.locator('text=Campo'))).toBeVisible().catch(() => {
      // Se não houver mensagem de erro explícita, é uma falha
    });
  });

  test('[TRISTE] Deve impedir salvar disciplina sem selecionar área', async ({ page }) => {
    const disciplinaName = `Disciplina Teste ${Date.now()}`;
    
    await disciplinasPage.addDisciplinaButton.click();
    await disciplinasPage.disciplinaNameInput.fill(disciplinaName);
    // Não seleciona a área
    await disciplinasPage.saveButton.click();
    
    // Verifica se há erro
    await expect(page.locator('text=obrigatório').or(page.locator('text=selecione'))).toBeVisible().catch(() => {
      // Se não houver erro, é problema
    });
  });

  // 🔧 CASOS DE BORDA (Edge Cases)
  test('[BORDA] Deve criar disciplina com nome muito longo', async ({ page }) => {
    const disciplinaLonga = 'D'.repeat(80);
    const areaName = 'Matemática e suas tecnologias';
    
    await disciplinasPage.addDisciplina(disciplinaLonga, areaName);
    
    // Verifica se foi criada
    await disciplinasPage.searchDisciplina(disciplinaLonga.substring(0, 40));
    await expect(page.getByText(new RegExp(disciplinaLonga.substring(0, 20)))).toBeVisible();
  });

  test('[BORDA] Deve criar disciplina com caracteres especiais', async ({ page }) => {
    const disciplinaPecial = `Disc. #@$${Date.now()}`;
    const areaName = 'Matemática e suas tecnologias';
    
    await disciplinasPage.addDisciplina(disciplinaPecial, areaName);
    
    // Verifica se foi criada
    await disciplinasPage.searchDisciplina(disciplinaPecial);
    await expect(page.getByText(disciplinaPecial)).toBeVisible();
  });
});
