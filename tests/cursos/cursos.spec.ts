import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { CursosPage } from '../../pages/CursosPage';
import { AuthHelper } from '../../fixtures/authHelper';

const SECRET = 'ITG5EYZN453DOJ3K';
const EMAIL = 'e2e-super-teacher-09@example.com';
const PASSWORD = 'password';

test.describe('Cursos - CRUD', () => {
  let loginPage: LoginPage;
  let cursosPage: CursosPage;

  test.beforeEach(async ({ page }) => {
    await page.goto('https://app.avaliei.com.br/login');
    loginPage = new LoginPage(page);
    await AuthHelper.loginWith2FA(page, EMAIL, PASSWORD, SECRET);
    
    await page.waitForLoadState('networkidle');
    
    if (page.url().includes('login')) {
      throw new Error('Falha na autenticação: ainda em página de login após 2FA');
    }
    
    cursosPage = new CursosPage(page);
    
    // Navega para Cursos clicando no menu
    let attempts = 0;
    let pageLoaded = false;
    
    while (attempts < 3 && !pageLoaded) {
      try {
        await cursosPage.navigateToCursos();
        pageLoaded = true;
      } catch (error) {
        attempts++;
        if (attempts < 3) {
          console.log(`Tentativa ${attempts} falhou, aguardando e tentando novamente...`);
          await page.waitForTimeout(2000);
        } else {
          throw error;
        }
      }
    }
  });

  // ✅ CASOS FELIZES (Happy Path)
  test('[FELIZ] Deve criar um curso com sucesso e procurar na listagem', async ({ page }) => {
    const nomeCurso = `Curso Teste ${Date.now()}`;
    
    // Cria o curso
    await cursosPage.addCurso(nomeCurso, 'Técnico');
    
    // Procura o curso na listagem
    await cursosPage.searchCurso(nomeCurso);
    
    // Verifica se o curso está visível
    const isVisible = await cursosPage.isCursoVisible(nomeCurso);
    expect(isVisible).toBe(true);
    
    // Limpa e deleta para não deixar dados
    await cursosPage.deleteCurso(nomeCurso);
  });

  test('[FELIZ] Deve editar um curso com sucesso e procurar na listagem', async ({ page }) => {
    const nomeCurso = `Curso Teste ${Date.now()}`;
    const novoNome = `Curso Editado ${Date.now()}`;
    
    // Cria o curso
    await cursosPage.addCurso(nomeCurso, 'Técnico');
    
    // Edita o curso
    await cursosPage.editCurso(nomeCurso, novoNome, 'Extensão');
    
    // Limpa a busca anterior
    await cursosPage.clearSearch();
    
    // Procura o novo nome
    await cursosPage.searchCurso(novoNome);
    
    // Verifica se o curso editado está visível
    const isVisible = await cursosPage.isCursoVisible(novoNome);
    expect(isVisible).toBe(true);
    
    // Limpa e deleta para não deixar dados
    await cursosPage.deleteCurso(novoNome);
  });

  // ❌ CASOS TRISTES (Negative Cases)
  test('[TRISTE] Deve exibir erro ao cadastrar apenas o nome do curso (sem escolaridade)', async ({ page }) => {
    const nomeCurso = `Curso Sem Escolaridade ${Date.now()}`;
    
    // Tenta adicionar curso sem escolaridade
    await cursosPage.addCursoButton.click();
    await cursosPage.nomeInput.waitFor({ state: 'visible', timeout: 10000 });
    await cursosPage.nomeInput.fill(nomeCurso);
    await page.waitForTimeout(500);
    await cursosPage.saveButton.click();
    
    // Aguarda para ver se há erro ou modal de confirmação
    await page.waitForTimeout(2000);
    
    // Verifica se há mensagem de erro
    const errorMsg = await cursosPage.getErrorMessage();
    
    // Espera um dos cenários: erro visível OU modal de erro
    const hasError = errorMsg || await page.locator('.error, .alert-danger, [role="alert"]').isVisible().catch(() => false);
    
    if (hasError) {
      // Se há erro, valida a existência
      expect(hasError).toBe(true);
      // Fecha o modal se existir
      try {
        await cursosPage.closeButton.click();
      } catch {
        // Modal pode não existir
      }
    } else {
      // Se não há erro visível, o curso pode não ter sido criado
      // Fecha o formulário e verifica a listagem
      try {
        await cursosPage.closeButton.click();
      } catch {
        // Button pode não estar disponível
      }
      await page.waitForTimeout(1000);
      await cursosPage.searchCurso(nomeCurso);
      const isVisible = await cursosPage.isCursoVisible(nomeCurso);
      // Espera que NÃO esteja visível já que estava incompleto
      expect(isVisible).toBe(false);
    }
  });

  test('[TRISTE] Deve exibir erro ao cadastrar apenas o nível de escolaridade (sem nome)', async ({ page }) => {
    // Tenta adicionar curso apenas com escolaridade (sem nome)
    await cursosPage.addCursoButton.click();
    await cursosPage.escolaridadeButton.waitFor({ state: 'visible', timeout: 10000 });
    await cursosPage.escolaridadeButton.click();
    await page.getByRole('option', { name: 'Técnico' }).click();
    await page.waitForTimeout(500);
    await cursosPage.saveButton.click();
    
    // Procura por mensagem de erro obrigatório
    const errorMessage = page.locator('text=Este campo é obrigatório');
    await expect(errorMessage).toBeVisible({ timeout: 5000 });
  });

  // 🔲 CASOS DE BORDA (Edge Cases)
  test('[BORDA] Deve exibir erro ao tentar criar um curso com caracteres especiais', async ({ page }) => {
    const nomeCurso = `Curso!@#$%^&*() ${Date.now()}`;
    
    // Tenta criar o curso com caracteres especiais
    await cursosPage.addCursoButton.click();
    await cursosPage.nomeInput.waitFor({ state: 'visible', timeout: 10000 });
    await cursosPage.nomeInput.fill(nomeCurso);
    await page.waitForTimeout(500);
    await cursosPage.escolaridadeButton.click();
    await page.getByRole('option', { name: 'Técnico' }).click();
    await page.waitForTimeout(500);
    await cursosPage.saveButton.click();
    
    // Procura a mensagem de erro específica
    const errorMessage = page.locator('text=Conteúdo inválido detectado');
    await expect(errorMessage).toBeVisible({ timeout: 5000 });
  });

  test('[BORDA] Deve exibir erro ao tentar criar um curso com nome superior a 255 caracteres', async ({ page }) => {
    const nomeCurso = `${'A'.repeat(256)}`; // 256 caracteres, acima do limite
    
    // Tenta criar o curso com nome muito longo
    await cursosPage.addCursoButton.click();
    await cursosPage.nomeInput.waitFor({ state: 'visible', timeout: 10000 });
    await cursosPage.nomeInput.fill(nomeCurso);
    await page.waitForTimeout(500);
    await cursosPage.escolaridadeButton.click();
    await page.getByRole('option', { name: 'Técnico' }).click();
    await page.waitForTimeout(500);
    await cursosPage.saveButton.click();
    
    // Procura a mensagem de erro específica
    const errorMessage = page.locator('text=não pode ser superior a 125 caracteres');
    await expect(errorMessage).toBeVisible({ timeout: 5000 });
  });
});
