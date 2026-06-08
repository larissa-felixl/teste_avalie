import { Page, Locator } from '@playwright/test';

export class ConteudosPage {
  readonly page: Page;
  readonly conteudosLink: Locator;
  readonly addConteudoButton: Locator;
  readonly conteudoNameInput: Locator;
  readonly disciplinaSelectButton: Locator;
  readonly saveButton: Locator;
  readonly searchInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.conteudosLink = page
      .getByRole('navigation', { name: 'Main' })
      .getByRole('link', { name: 'Conteúdos' });
    this.addConteudoButton = page.getByRole('button', { name: 'Adicionar Conteúdo' });
    this.conteudoNameInput = page.getByRole('textbox', { name: 'Nome do conteúdo: *' });
    this.disciplinaSelectButton = page.getByRole('button', { name: 'Disciplina' });
    this.saveButton = page.getByRole('button', { name: 'Salvar' });
    this.searchInput = page.getByRole('textbox', { name: 'Pesquisar conteúdo...' });
  }

  async navigateToConteudos() {
    await this.page.goto('https://app.avaliei.com.br/conteudos');
    await this.page.waitForURL('**/conteudos');
    await this.addConteudoButton.waitFor({ state: 'visible', timeout: 30000 });
  }

  async addConteudo(conteudoName: string, disciplinaName: string) {
    await this.addConteudoButton.click();
    await this.conteudoNameInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.conteudoNameInput.fill(conteudoName);

    await this.disciplinaSelectButton.click();
    const disciplinaOption = this.page.getByRole('option', { name: disciplinaName });
    await disciplinaOption.waitFor({ state: 'visible', timeout: 5000 });
    await disciplinaOption.click();

    await this.saveButton.click();
    await this.conteudoNameInput.waitFor({ state: 'hidden', timeout: 10000 });
  }


  async submitConteudoForm(conteudoName: string, disciplinaName?: string) {
    await this.addConteudoButton.click();
    await this.conteudoNameInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.conteudoNameInput.fill(conteudoName);

    if (disciplinaName) {
      await this.disciplinaSelectButton.click();
      const disciplinaOption = this.page.getByRole('option', { name: disciplinaName });
      await disciplinaOption.waitFor({ state: 'visible', timeout: 5000 });
      await disciplinaOption.click();
    }

    await this.saveButton.click();
    const alertLocator = this.page.locator('[role="alert"]:not(#__next-route-announcer__)');

    await Promise.race([
      this.conteudoNameInput.waitFor({ state: 'hidden', timeout: 10000 }), 
      alertLocator.first().waitFor({ state: 'visible', timeout: 10000 }),
    ]);
  }

  async searchConteudo(conteudoName: string) {
    await this.searchInput.click();
    await this.searchInput.fill(conteudoName);
    await this.page
      .locator('tbody tr')
      .filter({ hasText: conteudoName })
      .first()
      .waitFor({ state: 'visible', timeout: 10000 });
  }

  async editConteudo(conteudoName: string, newName: string, newDisciplina: string) {
    const conteudoRow = this.page.locator('tbody tr').filter({ hasText: conteudoName });
    await conteudoRow.waitFor({ state: 'visible', timeout: 10000 });
    await conteudoRow.getByRole('button', { name: 'Editar' }).click();

    await this.conteudoNameInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.conteudoNameInput.clear();
    await this.conteudoNameInput.fill(newName);

    await this.disciplinaSelectButton.click();
    const disciplinaOption = this.page.getByRole('option', { name: newDisciplina });
    await disciplinaOption.waitFor({ state: 'visible', timeout: 5000 });
    await disciplinaOption.click();

    await this.saveButton.click();
    await this.conteudoNameInput.waitFor({ state: 'hidden', timeout: 10000 });
  }

  async deleteConteudo(conteudoName: string) {
    const conteudoRow = this.page.locator('tbody tr').filter({ hasText: conteudoName });
    await conteudoRow.waitFor({ state: 'visible', timeout: 10000 });
    await conteudoRow.getByRole('button', { name: 'Excluir' }).click();

    const confirmButton = this.page.getByRole('button', { name: 'Excluir' }).last();
    await confirmButton.waitFor({ state: 'visible', timeout: 5000 });
    await confirmButton.click();
    await conteudoRow.waitFor({ state: 'hidden', timeout: 10000 });
  }

  async clearConteudoNameInput() {
    await this.conteudoNameInput.waitFor({ state: 'visible', timeout: 5000 });
    await this.conteudoNameInput.clear();
  }

  async isConteudoVisible(conteudoName: string): Promise<boolean> {
    try {
      const row = this.page.locator('tbody tr').filter({ hasText: conteudoName });
      await row.waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  async getErrorMessage(): Promise<string> {
    try {
      const errorLocator = this.page.locator('[role="alert"]').first();
      await errorLocator.waitFor({ state: 'visible', timeout: 8000 });
      const messageEl = errorLocator.locator('> :not(button)').last(); 
      return (await messageEl.textContent()) || (await errorLocator.textContent()) || '';
    } catch {
      return '';
    }
  }
}