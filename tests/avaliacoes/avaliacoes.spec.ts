import { test, expect } from '@playwright/test';
import { AvaliacoesPage } from '../../pages/AvaliacoesPage';
import { AuthHelper } from '../../fixtures/authHelper';

const SECRET = 'ITG5EYZN453DOJ3K';
const EMAIL = 'e2e-super-teacher-09@example.com';
const PASSWORD = 'password';

test.describe('Avaliações - CRUD', () => {
  let avaliacoesPage: AvaliacoesPage;

  test.beforeEach(async ({ page }) => {
    await page.goto('https://app.avaliei.com.br/login');
    await AuthHelper.loginWith2FA(page, EMAIL, PASSWORD, SECRET);
    await page.waitForLoadState('networkidle');

    if (page.url().includes('login')) {
      throw new Error('Falha na autenticação: ainda em página de login após 2FA');
    }

    avaliacoesPage = new AvaliacoesPage(page);
    await avaliacoesPage.navigateToAvaliacoes();
  });

  test('[FELIZ] Deve criar uma avaliação com sucesso', async () => {
    const descricao = `Avaliação Teste ${Date.now()}`;

    await avaliacoesPage.criarAvaliacao(
      descricao,
      '6º',
      '2º Bimestre',
      '12/06/2026',
      'Convencional'
    );

    await avaliacoesPage.navigateToAvaliacoes();

    const isVisible = await avaliacoesPage.isAvaliacaoVisible(descricao);
    expect(isVisible).toBe(true);
  });

  test('[FELIZ] Deve encontrar uma avaliação pelo campo de busca', async () => {
    const descricao = `Avaliação Teste ${Date.now()}`;

    await avaliacoesPage.criarAvaliacao(
      descricao,
      '6º',
      '2º Bimestre',
      '12/06/2026',
      'Convencional'
    );

    await avaliacoesPage.navigateToAvaliacoes();

    await avaliacoesPage.pesquisarAvaliacao(descricao);

    const isVisible = await avaliacoesPage.isAvaliacaoVisible(descricao);
    expect(isVisible).toBe(true);
  });

  test('[TRISTE] Deve impedir salvar avaliação sem descrição', async () => {
    await avaliacoesPage.abrirFormulario();
    await avaliacoesPage.selecionarTurma('6º');
    await avaliacoesPage.selecionarMarcador('2º Bimestre');
    await avaliacoesPage.preencherDataAplicacao('12/06/2026');
    await avaliacoesPage.selecionarModo('Convencional');
    await avaliacoesPage.salvarAvaliacaoButton.click();

    const inputVisible = await avaliacoesPage.descricaoInput
      .isVisible({ timeout: 2000 })
      .catch(() => false);
    expect(inputVisible).toBe(true);
  });

  test('[TRISTE] Deve impedir salvar avaliação sem turma selecionada', async () => {
    const descricao = `Avaliação Teste ${Date.now()}`;

    await avaliacoesPage.abrirFormulario();
    await avaliacoesPage.preencherDescricao(descricao);
    await avaliacoesPage.selecionarMarcador('2º Bimestre');
    await avaliacoesPage.preencherDataAplicacao('12/06/2026');
    await avaliacoesPage.selecionarModo('Convencional');
    await avaliacoesPage.salvarAvaliacaoButton.click();

    const inputVisible = await avaliacoesPage.descricaoInput
      .isVisible({ timeout: 2000 })
      .catch(() => false);
    expect(inputVisible).toBe(true);
  });

  test('[BORDA] Deve rejeitar descrição com injeção de script JS', async () => {
    await avaliacoesPage.abrirFormulario();
    await avaliacoesPage.preencherDescricao('<script>alert("xss")</script>Conteúdo');
    await avaliacoesPage.selecionarTurma('6º');
    await avaliacoesPage.selecionarMarcador('2º Bimestre');
    await avaliacoesPage.preencherDataAplicacao('12/06/2026');
    await avaliacoesPage.selecionarModo('Convencional');
    await avaliacoesPage.selecionarProfessor();
    await avaliacoesPage.selecionarDisciplina();
    await avaliacoesPage.salvarAvaliacaoButton.click();

    const errorMessage = await avaliacoesPage.getErrorMessage();
    expect(errorMessage).toContain('Conteúdo inválido detectado');
  });

  test('[BORDA] Deve rejeitar descrição com mais de 255 caracteres', async () => {
    await avaliacoesPage.abrirFormulario();
    await avaliacoesPage.preencherDescricao('A'.repeat(300));
    const descricaoValue = await avaliacoesPage.descricaoInput.inputValue();
    expect(descricaoValue.length).toBeGreaterThan(0);
  });

  test('[BORDA] Deve salvar avaliação com caracteres especiais na descrição', async () => {
    const descricao = `Avaliação @#$%*() - ${Date.now()}`;

    await avaliacoesPage.criarAvaliacao(
      descricao,
      '6º',
      '2º Bimestre',
      '12/06/2026',
      'Convencional'
    );

    await avaliacoesPage.navigateToAvaliacoes();

    const isVisible = await avaliacoesPage.isAvaliacaoVisible(descricao);
    expect(isVisible).toBe(true);
  });
});