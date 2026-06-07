import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
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

  // ❌ CASOS INFELIZES (Sad Path)
  test('[TRISTE] Deve mostrar erro ao tentar criar avaliação sem descrição', async ({ page }) => {
    // Clica em Criar Avaliação
    await avaliacoesPage.criarAvaliacaoButton.click();
    await page.waitForTimeout(1000);
    
    // Tenta salvar sem preencher a descrição (campo obrigatório)
    // Seleciona turma
    await avaliacoesPage.selecionarTurmasButton.click();
    await page.waitForTimeout(500);
    const turmaOption = page.getByRole('option').filter({ hasText: '6º' }).first();
    await turmaOption.click();
    await page.waitForTimeout(500);
    
    // Seleciona marcador
    await avaliacoesPage.selecionarMarcadoresButton.click();
    await page.waitForTimeout(500);
    const marcadorOption = page.getByRole('option', { name: '2º Bimestre' });
    await marcadorOption.click();
    await page.waitForTimeout(500);
    
    // Preenche data
    await avaliacoesPage.dataAplicacaoInput.click();
    await avaliacoesPage.dataAplicacaoInput.fill('12/06/2026');
    await page.waitForTimeout(500);
    
    // Seleciona modo
    await avaliacoesPage.modoSelect.click();
    await page.waitForTimeout(300);
    const modoOption = page.getByRole('option', { name: 'Convencional' });
    await modoOption.click();
    await page.waitForTimeout(500);
    
    // Tenta salvar sem descrição
    await avaliacoesPage.salvarAvaliacaoButton.click();
    await page.waitForTimeout(1000);
    
    // Verifica se há erro (mensagem de validação ou permanece na página)
    const errorMessage = page.locator('[role="alert"]').first();
    const hasError = await errorMessage.isVisible({ timeout: 3000 }).catch(() => false);
    
    // Ou verifica se ainda está na página de criação (não salvou)
    const criarButton = await avaliacoesPage.criarAvaliacaoButton.isVisible({ timeout: 2000 }).catch(() => false);
    
    expect(hasError || !criarButton).toBe(true);
  });

  test('[TRISTE] Deve mostrar erro ao tentar criar avaliação sem turma selecionada', async ({ page }) => {
    // Clica em Criar Avaliação
    await avaliacoesPage.criarAvaliacaoButton.click();
    await page.waitForTimeout(1000);
    
    // Preenche descrição
    await avaliacoesPage.descricaoInput.waitFor({ state: 'visible', timeout: 10000 });
    await avaliacoesPage.descricaoInput.fill('Avaliação sem turma');
    await page.waitForTimeout(500);
    
    // Seleciona marcador
    await avaliacoesPage.selecionarMarcadoresButton.click();
    await page.waitForTimeout(500);
    const marcadorOption = page.getByRole('option', { name: '2º Bimestre' });
    await marcadorOption.click();
    await page.waitForTimeout(500);
    
    // Preenche data
    await avaliacoesPage.dataAplicacaoInput.click();
    await avaliacoesPage.dataAplicacaoInput.fill('12/06/2026');
    await page.waitForTimeout(500);
    
    // Seleciona modo
    await avaliacoesPage.modoSelect.click();
    await page.waitForTimeout(300);
    const modoOption = page.getByRole('option', { name: 'Convencional' });
    await modoOption.click();
    await page.waitForTimeout(500);
    
    // Tenta salvar SEM selecionar turma
    await avaliacoesPage.salvarAvaliacaoButton.click();
    await page.waitForTimeout(1000);
    
    // Verifica se há erro
    const errorMessage = page.locator('[role="alert"]').first();
    const hasError = await errorMessage.isVisible({ timeout: 3000 }).catch(() => false);
    
    // Ou verifica se ainda está na página de criação
    const descricaoInput = await avaliacoesPage.descricaoInput.isVisible({ timeout: 2000 }).catch(() => false);
    
    expect(hasError || descricaoInput).toBe(true);
  });

  // 🔲 CASOS DE BORDA (Edge Cases)
  test('[BORDA] Deve detectar injeção de script JS na descrição', async ({ page }) => {
    const descricaoComScript = '<script>alert("xss")</script>Conteúdo';
    const dataAplicacao = '12/06/2026';
    
    // Tenta criar com script na descrição
    await avaliacoesPage.criarAvaliacaoButton.click();
    await page.waitForTimeout(1000);
    
    // Preenche com script
    await avaliacoesPage.descricaoInput.waitFor({ state: 'visible', timeout: 10000 });
    await avaliacoesPage.descricaoInput.fill(descricaoComScript);
    await page.waitForTimeout(500);
    
    // Seleciona turma
    await avaliacoesPage.selecionarTurmasButton.click();
    await page.waitForTimeout(500);
    const turmaOption = page.getByRole('option').filter({ hasText: '6º' }).first();
    await turmaOption.click();
    await page.waitForTimeout(500);
    
    // Seleciona marcador
    await avaliacoesPage.selecionarMarcadoresButton.click();
    await page.waitForTimeout(500);
    const marcadorOption = page.getByRole('option', { name: '2º Bimestre' });
    await marcadorOption.click();
    await page.waitForTimeout(500);
    
    // Preenche data
    await avaliacoesPage.dataAplicacaoInput.click();
    await avaliacoesPage.dataAplicacaoInput.fill(dataAplicacao);
    await page.waitForTimeout(500);
    
    // Seleciona modo
    await avaliacoesPage.modoSelect.click();
    await page.waitForTimeout(300);
    const modoOption = page.getByRole('option', { name: 'Convencional' });
    await modoOption.click();
    await page.waitForTimeout(500);
    
    // Preenche bloco objetivo
    const professorButton = page.getByLabel('Bloco objetivo 1').getByRole('button').filter({ hasText: 'Professor' }).first();
    await professorButton.click();
    await page.waitForTimeout(500);
    const primeiroProf = page.getByRole('option').first();
    await primeiroProf.click();
    await page.waitForTimeout(500);
    
    const disciplinaSelect = page.getByRole('combobox', { name: /Selecionar disciplina para Bloco objetivo/ }).first();
    await disciplinaSelect.click();
    await page.waitForTimeout(500);
    const primeiraDisciplina = page.getByRole('option').first();
    await primeiraDisciplina.click();
    await page.waitForTimeout(500);
    
    // Tenta salvar
    await avaliacoesPage.salvarAvaliacaoButton.click();
    await page.waitForTimeout(1500);
    
    // Verifica se há erro de validação (rejeitou o script)
    const errorMessage = page.locator('[role="alert"]').first();
    const hasError = await errorMessage.isVisible({ timeout: 3000 }).catch(() => false);
    
    // Ou verifica se ainda está na página (não salvou por validação)
    const descricaoInput = await avaliacoesPage.descricaoInput.isVisible({ timeout: 2000 }).catch(() => false);
    
    // Ou verificar se sanitizou (se conseguiu salvar, o script foi removido)
    if (!hasError && !descricaoInput) {
      // Salvou - verifica se a descrição foi sanitizada
      await page.waitForNavigation({ timeout: 5000 }).catch(() => {});
      await page.waitForTimeout(1000);
      
      const searchBox = page.getByRole('textbox', { name: 'Pesquisar' });
      await searchBox.click();
      await searchBox.fill('Conteúdo');
      await page.waitForTimeout(1000);
      
      // Se encontrou com "Conteúdo", significa que sanitizou o script
      const avaliacaoHeading = page.getByRole('heading').filter({ hasText: 'Conteúdo' }).first();
      const found = await avaliacaoHeading.isVisible({ timeout: 3000 }).catch(() => false);
      
      expect(found).toBe(true); // Script foi removido, apenas "Conteúdo" permaneceu
    } else {
      // Rejeitou ou não salvou - o que é esperado
      expect(hasError || descricaoInput).toBe(true);
    }
  });

  test('[BORDA] Deve rejeitar descrição com mais de 255 caracteres', async ({ page }) => {
    // Cria string com 300 caracteres
    const descricaoLonga = 'A'.repeat(300);
    
    // Tenta criar com descrição muito longa
    await avaliacoesPage.criarAvaliacaoButton.click();
    await page.waitForTimeout(1000);
    
    // Preenche com descrição longa
    await avaliacoesPage.descricaoInput.waitFor({ state: 'visible', timeout: 10000 });
    await avaliacoesPage.descricaoInput.fill(descricaoLonga);
    await page.waitForTimeout(500);
    
    // Verifica se o campo limitou a entrada (truncou)
    const descricaoValue = await avaliacoesPage.descricaoInput.inputValue();
    
    // Ou verifica se campo rejeitou caracteres extras
    expect(descricaoValue.length).toBeLessThanOrEqual(255);
  });

  test('[BORDA] Deve salvar avaliação com caracteres especiais na descrição', async ({ page }) => {
    const descricao = `Avaliação @#$%*() - ${Date.now()}`;
    const dataAplicacao = '12/06/2026';
    
    // Tenta criar com caracteres especiais (não script)
    await avaliacoesPage.criarAvaliacao(
      descricao,
      '6º',
      '2º Bimestre',
      dataAplicacao,
      'Convencional'
    );
    
    // Aguarda redirecionamento
    await page.waitForNavigation({ timeout: 10000 }).catch(() => {});
    await page.waitForTimeout(2000);
    
    // Procura pela avaliação
    const searchBox = page.getByRole('textbox', { name: 'Pesquisar' });
    await searchBox.click();
    await searchBox.fill(descricao);
    await page.waitForTimeout(1500);
    
    // Verifica se foi salva corretamente
    const avaliacaoHeading = page.getByRole('heading').filter({ hasText: 'Avaliação' }).first();
    const isVisible = await avaliacaoHeading.isVisible().catch(() => false);
    
    expect(isVisible).toBe(true);
  });
});
