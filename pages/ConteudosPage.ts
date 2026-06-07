import { Page, Locator } from '@playwright/test';

export class ConteudosPage {
  readonly page: Page;
  readonly conteudosLink: Locator;
  readonly addConteudoButton: Locator;
  readonly conteudoNameInput: Locator;
  readonly disciplinaSelectButton: Locator;
  readonly saveButton: Locator;
  readonly searchInput: Locator;
  readonly editButton: Locator;
  readonly deleteButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.conteudosLink = page.locator('a[href="/conteudos"]');
    this.addConteudoButton = page.getByRole('button', { name: 'Adicionar Conteúdo' });
    this.conteudoNameInput = page.getByRole('textbox', { name: 'Nome do conteúdo: *' });
    this.disciplinaSelectButton = page.getByRole('button', { name: 'Disciplina' });
    this.saveButton = page.getByRole('button', { name: 'Salvar' });
    this.searchInput = page.getByRole('textbox', { name: 'Pesquisar conteúdo...' });
    this.editButton = page.getByRole('button', { name: 'Editar' });
    this.deleteButton = page.getByRole('button', { name: 'Excluir' });
  }

  async navigateToConteudos() {
    await this.page.goto('https://app.avaliei.com.br/conteudos');
    await this.page.waitForLoadState('networkidle');
  }

  async addConteudo(conteudoName: string, disciplinaName: string) {
    await this.addConteudoButton.click();
    await this.conteudoNameInput.fill(conteudoName);
    await this.disciplinaSelectButton.click();
    await this.page.getByRole('option', { name: disciplinaName }).click();
    await this.saveButton.click();
  }

  async searchConteudo(conteudoName: string) {
    await this.searchInput.click();
    await this.searchInput.fill(conteudoName);
  }

  async editConteudo(conteudoName: string, newName: string, newDisciplina: string) {
    // Encontra a linha específica do conteúdo
    const conteudoRow = this.page.locator('tbody tr').filter({ hasText: conteudoName });
    
    // Clica no botão Editar dessa linha específica
    await conteudoRow.locator('button:has-text("Editar")').first().click();
    
    await this.conteudoNameInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.conteudoNameInput.clear();
    await this.conteudoNameInput.fill(newName);
    await this.disciplinaSelectButton.click();
    await this.page.getByRole('option', { name: newDisciplina }).click();
    await this.saveButton.click();
  }

  async deleteConteudo(conteudoName: string) {
    // Encontra a linha específica do conteúdo
    const conteudoRow = this.page.locator('tbody tr').filter({ hasText: conteudoName });
    
    // Clica no botão Excluir dessa linha específica
    await conteudoRow.locator('button:has-text("x")').first().click();
    
    // Confirma a exclusão
    const confirmDelete = this.page.getByRole('button', { name: 'Excluir' }).last();
    await confirmDelete.click();
  }

  async clearConteudoNameInput() {
    await this.conteudoNameInput.clear();
  }
}
