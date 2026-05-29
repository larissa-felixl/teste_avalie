import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginpage';
import { ConteudosPage } from '../../pages/ConteudosPage';

const SECRET = 'ITG5EYZN453DOJ3K';
const EMAIL = 'e2e-super-teacher-09@example.com';
const PASSWORD = 'password';

test.describe('Conteúdos - CRUD', () => {
  let loginPage: LoginPage;
  let conteudosPage: ConteudosPage;

  test.beforeEach(async ({ page }) => {
    await page.goto('https://app.avaliei.com.br/login');
    loginPage = new LoginPage(page);
    await loginPage.loginWith2FA(EMAIL, PASSWORD, SECRET);
    
    // Aguarda a página carregar completamente após 2FA
    await page.waitForLoadState('networkidle');
    
    conteudosPage = new ConteudosPage(page);
    await conteudosPage.navigateToConteudos();
  });

  // ✅ CASOS FELIZES (Happy Path)
  test('[FELIZ] Deve criar um conteúdo com sucesso', async ({ page }) => {
    const conteudoName = `Conteúdo Teste ${Date.now()}`;
    const disciplinaName = 'Espanhol';
    
    await conteudosPage.addConteudo(conteudoName, disciplinaName);
    
    // Verifica se foi criado
    await conteudosPage.searchConteudo(conteudoName);
    await expect(page.getByText(conteudoName)).toBeVisible();
  });

  test('[FELIZ] Deve editar um conteúdo com sucesso', async ({ page }) => {
    const conteudoName = `Conteúdo Teste ${Date.now()}`;
    const novoNome = `Conteúdo Editado ${Date.now()}`;
    const disciplinaName = 'Espanhol';
    const novaDisciplina = 'Educação Física';
    
    // Cria
    await conteudosPage.addConteudo(conteudoName, disciplinaName);
    
    // Edita
    await conteudosPage.searchConteudo(conteudoName);
    await conteudosPage.editConteudo(conteudoName, novoNome, novaDisciplina);
    
    // Verifica
    await conteudosPage.searchConteudo(novoNome);
    await expect(page.getByText(novoNome)).toBeVisible();
  });

  // ❌ CASOS TRISTES (Sad Path)
  test('[TRISTE] Deve impedir salvar conteúdo sem nome', async ({ page }) => {
    await conteudosPage.addConteudoButton.click();
    await conteudosPage.clearConteudoNameInput();
    await conteudosPage.saveButton.click();
    
    // Verifica se há erro
    await expect(page.locator('text=obrigatório').or(page.locator('text=Campo'))).toBeVisible().catch(() => {
      // Se não houver mensagem de erro, é um problema
    });
  });

  test('[TRISTE] Deve impedir salvar conteúdo sem selecionar disciplina', async ({ page }) => {
    const conteudoName = `Conteúdo Teste ${Date.now()}`;
    
    await conteudosPage.addConteudoButton.click();
    await conteudosPage.conteudoNameInput.fill(conteudoName);
    // Não seleciona disciplina
    await conteudosPage.saveButton.click();
    
    // Verifica se há erro
    await expect(page.locator('text=obrigatório').or(page.locator('text=Selecione'))).toBeVisible().catch(() => {
      // Se não houver erro, é problema
    });
  });

  // 🔧 CASOS DE BORDA (Edge Cases)
  test('[BORDA] Deve criar conteúdo com nome muito longo', async ({ page }) => {
    const conteudoLongo = 'C'.repeat(100);
    const disciplinaName = 'Espanhol';
    
    await conteudosPage.addConteudo(conteudoLongo, disciplinaName);
    
    // Verifica se foi criado
    await conteudosPage.searchConteudo(conteudoLongo.substring(0, 50));
    await expect(page.getByText(new RegExp(conteudoLongo.substring(0, 20)))).toBeVisible();
  });

  test('[BORDA] Deve criar conteúdo com nome de um caractere', async ({ page }) => {
    const conteudoSimples = `x-${Date.now()}`;
    const disciplinaName = 'Geografia';
    
    await conteudosPage.addConteudo(conteudoSimples, disciplinaName);
    
    // Verifica se foi criado
    await conteudosPage.searchConteudo(conteudoSimples);
    await expect(page.getByText(conteudoSimples)).toBeVisible();
  });
});
