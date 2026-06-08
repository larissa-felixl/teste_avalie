import { Page, Locator } from '@playwright/test';

export class CursosPage {
  readonly page: Page;
  readonly turmasButton: Locator;
  readonly cursosLink: Locator;
  readonly addCursoButton: Locator;
  readonly nomeInput: Locator;
  readonly escolaridadeButton: Locator;
  readonly saveButton: Locator;
  readonly searchInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.turmasButton = page
      .getByRole('navigation', { name: 'Main' })
      .getByRole('button', { name: 'Turmas' });
    this.cursosLink = page.getByRole('link', { name: 'Cursos' });
    this.addCursoButton = page.getByRole('button', { name: 'Adicionar Curso' });
    this.nomeInput = page.getByRole('textbox', { name: 'Nome do Curso: *' });
    this.escolaridadeButton = page.getByRole('button', { name: 'Nível de Escolaridade' });
    this.saveButton = page.getByRole('button', { name: 'Salvar' });
    this.searchInput = page.getByRole('textbox', { name: 'Pesquisar curso...' });
  }

  async navigateToCursos() {
    await this.turmasButton.click();
    await this.cursosLink.waitFor({ state: 'visible', timeout: 5000 });
    await this.cursosLink.click();
    await this.page.waitForURL('**/cursos');
    await this.addCursoButton.waitFor({ state: 'visible', timeout: 30000 });
  }

  private async selecionarEscolaridade(escolaridade: string) {
    await this.escolaridadeButton.click();
    const buscaInput = this.page
      .getByRole('textbox', { name: 'Buscar nível...' })
      .or(this.page.getByPlaceholder('Buscar nível...'));
    await buscaInput.waitFor({ state: 'visible', timeout: 5000 });
    await buscaInput.fill(escolaridade);

    const option = this.page.getByRole('option', { name: escolaridade });
    await option.waitFor({ state: 'visible', timeout: 5000 });
    await option.click();
  }

  async addCurso(nomeCurso: string, escolaridade?: string) {
    await this.addCursoButton.click();
    await this.nomeInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.nomeInput.fill(nomeCurso);

    if (escolaridade) {
      await this.selecionarEscolaridade(escolaridade);
    }

    await this.saveButton.click();
    await this.nomeInput.waitFor({ state: 'hidden', timeout: 10000 });
  }

  async submitCursoForm(nomeCurso?: string, escolaridade?: string) {
    await this.addCursoButton.click();
    await this.nomeInput.waitFor({ state: 'visible', timeout: 10000 });

    if (nomeCurso) {
      await this.nomeInput.fill(nomeCurso);
    }

    if (escolaridade) {
      await this.selecionarEscolaridade(escolaridade);
    }

    await this.saveButton.click();
    const alertLocator = this.page.locator(
      '[role="alert"]:not(#__next-route-announcer__)'
    );
    await Promise.race([
      this.nomeInput.waitFor({ state: 'hidden', timeout: 10000 }),
      alertLocator.first().waitFor({ state: 'visible', timeout: 10000 }),
    ]);
  }

  async searchCurso(nomeCurso: string) {
    await this.searchInput.click();
    await this.searchInput.fill(nomeCurso);
    await this.page
      .locator('tbody tr')
      .filter({ hasText: nomeCurso })
      .first()
      .waitFor({ state: 'visible', timeout: 10000 });
  }

  async editCurso(nomeCurso: string, novoNome?: string, novaEscolaridade?: string) {
    await this.searchCurso(nomeCurso);

    const cursoRow = this.page.locator('tbody tr').filter({ hasText: nomeCurso });
    await cursoRow.waitFor({ state: 'visible', timeout: 10000 });
    await cursoRow.getByRole('button', { name: 'Editar' }).click();

    if (novoNome) {
      await this.nomeInput.waitFor({ state: 'visible', timeout: 10000 });
      await this.nomeInput.press('Control+A');
      await this.nomeInput.fill(novoNome);
    }

    if (novaEscolaridade) {
      await this.selecionarEscolaridade(novaEscolaridade);
    }

    await this.saveButton.click();
    await this.nomeInput.waitFor({ state: 'hidden', timeout: 10000 });
  }

  async deleteCurso(nomeCurso: string) {
    await this.searchCurso(nomeCurso);

    const cursoRow = this.page.locator('tbody tr').filter({ hasText: nomeCurso });
    await cursoRow.waitFor({ state: 'visible', timeout: 10000 });
    await cursoRow.getByRole('button', { name: 'Excluir' }).click();

    const confirmButton = this.page.getByRole('button', { name: 'Excluir' }).last();
    await confirmButton.waitFor({ state: 'visible', timeout: 5000 });
    await confirmButton.click();
    await cursoRow.waitFor({ state: 'hidden', timeout: 10000 });
  }

  async isCursoVisible(nomeCurso: string): Promise<boolean> {
    try {
      const row = this.page.locator('tbody tr').filter({ hasText: nomeCurso });
      await row.waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  async getInlineError(): Promise<string> {
    try {
      const inlineError = this.page
        .locator('[role="alert"]:not(#__next-route-announcer__), .text-destructive')
        .first();
      await inlineError.waitFor({ state: 'visible', timeout: 5000 });
      return (await inlineError.textContent()) || '';
    } catch {
      return '';
    }
  }

  async getErrorMessage(): Promise<string> {
    try {
      const errorLocator = this.page
        .locator('[role="alert"]:not(#__next-route-announcer__)')
        .first();
      await errorLocator.waitFor({ state: 'visible', timeout: 8000 });
      const messageEl = errorLocator.locator('> :not(button)').last();
      return (await messageEl.textContent()) || (await errorLocator.textContent()) || '';
    } catch {
      return '';
    }
  }
}