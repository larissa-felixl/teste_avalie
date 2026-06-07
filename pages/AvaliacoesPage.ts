import { Page, Locator } from '@playwright/test';

export class AvaliacoesPage {
  readonly page: Page;
  readonly avaliacoesLink: Locator;
  readonly criarAvaliacaoButton: Locator;
  readonly descricaoInput: Locator;
  readonly selecionarTurmasButton: Locator;
  readonly selecionarMarcadoresButton: Locator;
  readonly dataAplicacaoInput: Locator;
  readonly modoSelect: Locator;
  readonly salvarAvaliacaoButton: Locator;
  readonly salvarAlteracoesButton: Locator;
  readonly closeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.avaliacoesLink = page.getByRole('link', { name: 'Avaliações' });
    this.criarAvaliacaoButton = page.getByRole('button', { name: 'Criar Avaliação' });
    this.descricaoInput = page.getByRole('textbox', { name: 'Descrição da avaliação: *' });
    this.selecionarTurmasButton = page.getByText('Selecionar turmas');
    this.selecionarMarcadoresButton = page.getByText('Selecionar marcadores');
    this.dataAplicacaoInput = page.getByRole('textbox', { name: 'Data de aplicação' });
    this.modoSelect = page.getByRole('combobox', { name: 'Modo: campo obrigatório' });
    this.salvarAvaliacaoButton = page.getByRole('button', { name: 'Salvar avaliação' });
    this.salvarAlteracoesButton = page.getByRole('button', { name: 'Salvar Alterações' });
    this.closeButton = page.getByRole('button', { name: 'Close' });
  }

  async navigateToAvaliacoes() {
    await this.avaliacoesLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async criarAvaliacao(descricao: string, turma: string, marcador: string, dataAplicacao: string, modo: string) {
    // Clica em Criar Avaliação
    await this.criarAvaliacaoButton.click();
    await this.page.waitForTimeout(1000);
    
    // Preenche descrição
    await this.descricaoInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.descricaoInput.fill(descricao);
    await this.page.waitForTimeout(500);
    
    // Seleciona turma
    await this.selecionarTurmasButton.click();
    await this.page.waitForTimeout(500);
    const turmaOption = this.page.getByRole('option').filter({ hasText: turma }).first();
    await turmaOption.click();
    await this.page.waitForTimeout(500);
    
    // Seleciona marcador
    await this.selecionarMarcadoresButton.click();
    await this.page.waitForTimeout(500);
    const marcadorOption = this.page.getByRole('option', { name: marcador });
    await marcadorOption.click();
    await this.page.waitForTimeout(500);
    
    // Preenche data
    await this.dataAplicacaoInput.click();
    await this.dataAplicacaoInput.fill(dataAplicacao);
    await this.page.waitForTimeout(500);
    
    // Seleciona modo
    await this.modoSelect.click();
    await this.page.waitForTimeout(300);
    const modoOption = this.page.getByRole('option', { name: modo });
    await modoOption.click();
    await this.page.waitForTimeout(500);
    
    // Preenche bloco objetivo 1 - Professor
    const professorButton = this.page.getByLabel('Bloco objetivo 1').getByRole('button').filter({ hasText: 'Professor' }).first();
    await professorButton.click();
    await this.page.waitForTimeout(500);
    
    // Seleciona primeiro professor disponível
    const primeiroProf = this.page.getByRole('option').first();
    await primeiroProf.click();
    await this.page.waitForTimeout(500);
    
    // Preenche bloco objetivo 1 - Disciplina
    const disciplinaSelect = this.page.getByRole('combobox', { name: /Selecionar disciplina para Bloco objetivo/ }).first();
    await disciplinaSelect.click();
    await this.page.waitForTimeout(500);
    
    // Seleciona primeira disciplina disponível
    const primeiraDisciplina = this.page.getByRole('option').first();
    await primeiraDisciplina.click();
    await this.page.waitForTimeout(500);
    
    // Salva
    await this.salvarAvaliacaoButton.click();
    await this.page.waitForTimeout(2000);
  }

  async editarAvaliacao(descricao: string, novaDataAplicacao: string) {
    // Aguarda a página carregar
    await this.page.waitForTimeout(1000);
    
    // Procura pela avaliação e clica em "Mais Ações"
    const avaliacaoHeading = this.page.getByRole('heading').filter({ hasText: descricao }).first();
    await avaliacaoHeading.waitFor({ state: 'visible', timeout: 10000 });
    
    // Procura pelo botão "Mais Ações" mais próximo
    const maisAcoesButton = await this.page.locator('button').filter({ hasText: 'Mais Ações' }).first();
    await maisAcoesButton.click();
    await this.page.waitForTimeout(500);
    
    // Clica em Editar
    const editarOption = this.page.getByRole('menuitem', { name: 'Editar' });
    await editarOption.click();
    await this.page.waitForTimeout(1000);
    
    // Edita a data de aplicação
    await this.dataAplicacaoInput.click();
    await this.dataAplicacaoInput.press('Control+A');
    await this.dataAplicacaoInput.fill(novaDataAplicacao);
    await this.page.waitForTimeout(500);
    
    // Salva alterações
    await this.salvarAlteracoesButton.click();
    await this.page.waitForTimeout(2000);
  }

  async isAvaliacaoVisible(descricao: string): Promise<boolean> {
    try {
      const row = this.page.getByRole('row').filter({ hasText: descricao });
      await row.waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  async getErrorMessage(): Promise<string> {
    try {
      const errorLocator = this.page.locator('[role="alert"]').first();
      await errorLocator.waitFor({ state: 'visible', timeout: 5000 });
      return await errorLocator.textContent() || '';
    } catch {
      return '';
    }
  }
}
