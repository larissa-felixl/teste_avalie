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
  readonly searchInput: Locator;

  constructor(page: Page) {
    this.page = page;
    // ✅ Escopo no nav principal para evitar ambiguidade
    this.avaliacoesLink = page
      .getByRole('navigation', { name: 'Main' })
      .getByRole('link', { name: 'Avaliações' });
    this.criarAvaliacaoButton = page.getByRole('button', { name: 'Criar Avaliação' });
    this.descricaoInput = page.getByRole('textbox', { name: 'Descrição da avaliação: *' });
    this.selecionarTurmasButton = page.getByText('Selecionar turmas');
    this.selecionarMarcadoresButton = page.getByText('Selecionar marcadores');
    this.dataAplicacaoInput = page.getByRole('textbox', { name: 'Data de aplicação' });
    this.modoSelect = page.getByRole('combobox', { name: 'Modo: campo obrigatório' });
    this.salvarAvaliacaoButton = page.getByRole('button', { name: 'Salvar avaliação' });
    this.salvarAlteracoesButton = page.getByRole('button', { name: 'Salvar Alterações' });
    // ✅ searchInput adicionado ao construtor
    this.searchInput = page.getByPlaceholder('Pesquisar avaliações...');
  }

  async navigateToAvaliacoes() {
    await this.page.goto('https://app.avaliei.com.br/avaliacoes');
    await this.page.waitForURL('**/avaliacoes');
    // ✅ Aguarda o botão principal em vez de networkidle
    await this.criarAvaliacaoButton.waitFor({ state: 'visible', timeout: 30000 });
  }

  // ✅ PASSOS REUTILIZÁVEIS — cada ação isolada
  async abrirFormulario() {
    await this.criarAvaliacaoButton.click();
    await this.descricaoInput.waitFor({ state: 'visible', timeout: 10000 });
  }

  async preencherDescricao(descricao: string) {
    await this.descricaoInput.fill(descricao);
  }

  async selecionarTurma(turma: string) {
    await this.selecionarTurmasButton.click();
    const turmaOption = this.page.getByRole('option', { name: turma });
    await turmaOption.waitFor({ state: 'visible', timeout: 5000 });
    await turmaOption.click();
  }

  async selecionarMarcador(marcador: string) {
    await this.selecionarMarcadoresButton.click();
    const marcadorOption = this.page.getByRole('option', { name: marcador });
    await marcadorOption.waitFor({ state: 'visible', timeout: 5000 });
    await marcadorOption.click();
  }

  async preencherDataAplicacao(dataAplicacao: string) {
    await this.dataAplicacaoInput.click();
    await this.dataAplicacaoInput.fill(dataAplicacao);
  }

  async selecionarModo(modo: string) {
    await this.modoSelect.click();
    const modoOption = this.page.getByRole('option', { name: modo });
    await modoOption.waitFor({ state: 'visible', timeout: 5000 });
    await modoOption.click();
  }

  async selecionarProfessor() {
    const professorButton = this.page
      .getByLabel('Bloco objetivo 1')
      .getByRole('button', { name: 'Professor' });
    await professorButton.waitFor({ state: 'visible', timeout: 5000 });
    await professorButton.click();

    const primeiroProf = this.page.getByRole('option').first();
    await primeiroProf.waitFor({ state: 'visible', timeout: 5000 });
    await primeiroProf.click();
  }

  async selecionarDisciplina() {
    const disciplinaSelect = this.page.getByRole('combobox', {
      name: /Selecionar disciplina para Bloco objetivo/,
    });
    await disciplinaSelect.waitFor({ state: 'visible', timeout: 5000 });
    await disciplinaSelect.click();

    const primeiraDisciplina = this.page.getByRole('option').first();
    await primeiraDisciplina.waitFor({ state: 'visible', timeout: 5000 });
    await primeiraDisciplina.click();
  }

  async salvar() {
    await this.salvarAvaliacaoButton.click();
    // ✅ Aguarda o formulário fechar como confirmação de sucesso
    await this.descricaoInput.waitFor({ state: 'hidden', timeout: 15000 });
  }

  // ✅ MÉTODO COMPOSTO — usa os passos reutilizáveis
  async criarAvaliacao(
    descricao: string,
    turma: string,
    marcador: string,
    dataAplicacao: string,
    modo: string
  ) {
    await this.abrirFormulario();
    await this.preencherDescricao(descricao);
    await this.selecionarTurma(turma);
    await this.selecionarMarcador(marcador);
    await this.preencherDataAplicacao(dataAplicacao);
    await this.selecionarModo(modo);
    await this.selecionarProfessor();
    await this.selecionarDisciplina();
    await this.salvar();
  }

  async pesquisarAvaliacao(descricao: string) {
    await this.searchInput.fill(descricao);
    // ✅ Aguarda a lista refletir o resultado da busca
    await this.page
      .getByRole('heading', { level: 3 })
      .filter({ hasText: descricao })
      .first()
      .waitFor({ state: 'visible', timeout: 10000 });
  }

  async isAvaliacaoVisible(descricao: string): Promise<boolean> {
    try {
      const heading = this.page.getByRole('heading').filter({ hasText: descricao });
      await heading.waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  async getErrorMessage(): Promise<string> {
    try {
      // O alert fica fora do modal — espera até 8s pois pode aparecer após o modal fechar
      const errorLocator = this.page.locator('[role="alert"]').first();
      await errorLocator.waitFor({ state: 'visible', timeout: 8000 });
      // Pega só o texto do conteúdo, ignorando o botão "Dismiss"
      const messageEl = errorLocator.locator('> :not(button)').last();
      return (await messageEl.textContent()) || (await errorLocator.textContent()) || '';
    } catch {
      return '';
    }
  }
}