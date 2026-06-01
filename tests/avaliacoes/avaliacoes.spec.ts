import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginpage';
import { AvaliacoesPage } from '../../pages/AvaliacoesPage';

const SECRET = 'ITG5EYZN453DOJ3K';
const EMAIL = 'e2e-super-teacher-09@example.com';
const PASSWORD = 'password';

test.describe('Avaliações - CRUD', () => {
  let loginPage: LoginPage;
  let avaliacoesPage: AvaliacoesPage;

  test.beforeEach(async ({ page }) => {
    await page.goto('https://app.avaliei.com.br/login');
    loginPage = new LoginPage(page);
    await loginPage.loginWith2FA(EMAIL, PASSWORD, SECRET);
    
    await page.waitForLoadState('networkidle');
    
    if (page.url().includes('login')) {
      throw new Error('Falha na autenticação: ainda em página de login após 2FA');
    }
    
    avaliacoesPage = new AvaliacoesPage(page);
    
    let attempts = 0;
    let pageLoaded = false;
    
    while (attempts < 3 && !pageLoaded) {
      try {
        await avaliacoesPage.navigateToAvaliacoes();
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
  test('[FELIZ] Deve criar uma avaliação com sucesso', async ({ page }) => {
    const descricao = `Avaliação Teste ${Date.now()}`;
    const dataAplicacao = '12/06/2026';
    
    // Cria a avaliação
    await avaliacoesPage.criarAvaliacao(
      descricao,
      '6º',
      '2º Bimestre',
      dataAplicacao,
      'Convencional'
    );
    
    // Aguarda a navegação de volta para avaliações
    await page.waitForNavigation({ timeout: 10000 }).catch(() => {});
    await page.waitForTimeout(2000);
    
    // Procura pela avaliação usando a busca
    const searchBox = page.getByRole('textbox', { name: 'Pesquisar' });
    await searchBox.click();
    await searchBox.fill(descricao);
    await page.waitForTimeout(1500);
    
    // Verifica se a avaliação foi encontrada na listagem
    const avaliacaoHeading = page.getByRole('heading').filter({ hasText: descricao }).first();
    const isVisible = await avaliacaoHeading.isVisible().catch(() => false);
    expect(isVisible).toBe(true);
  });

  test('[FELIZ] Deve editar uma avaliação com sucesso', async ({ page }) => {
    const descricao = `Avaliação Teste ${Date.now()}`;
    const novaData = '15/06/2026';
    const dataAplicacao = '12/06/2026';
    
    // Cria a avaliação
    await avaliacoesPage.criarAvaliacao(
      descricao,
      '6º',
      '2º Bimestre',
      dataAplicacao,
      'Convencional'
    );
    
    // Aguarda a navegação de volta
    await page.waitForNavigation({ timeout: 10000 }).catch(() => {});
    await page.waitForTimeout(2000);
    
    // Procura pela avaliação usando a busca
    const searchBox = page.getByRole('textbox', { name: 'Pesquisar' });
    await searchBox.click();
    await searchBox.fill(descricao);
    await page.waitForTimeout(1500);
    
    // Edita a avaliação
    await avaliacoesPage.editarAvaliacao(descricao, novaData);
    
    // Aguarda a confirmação e volta para listagem
    await page.waitForNavigation({ timeout: 10000 }).catch(() => {});
    await page.waitForTimeout(2000);
    
    // Procura novamente pela avaliação na listagem
    await searchBox.click();
    await searchBox.fill(descricao);
    await page.waitForTimeout(1500);
    
    // Verifica se a avaliação ainda está lá (editada)
    const avaliacaoHeading = page.getByRole('heading').filter({ hasText: descricao }).first();
    const isVisible = await avaliacaoHeading.isVisible().catch(() => false);
    expect(isVisible).toBe(true);
  });
});
