import { Page, Locator } from '@playwright/test';

export class DisciplinasPage {
  readonly page: Page;
  readonly disciplinasLink: Locator;
  readonly addDisciplinaButton: Locator;
  readonly disciplinaNameInput: Locator;
  readonly areaSelectButton: Locator;
  readonly saveButton: Locator;
  readonly searchInput: Locator;
  readonly editButton: Locator;
  readonly deleteButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.disciplinasLink = page.locator('a[href="/disciplinas"]');
    this.addDisciplinaButton = page.getByRole('button', { name: 'Adicionar disciplina' });
    this.disciplinaNameInput = page.getByRole('textbox', { name: 'Nome da disciplina: *' });
    this.areaSelectButton = page.getByRole('button', { name: 'Selecione a área da disciplina' });
    this.saveButton = page.getByRole('button', { name: 'Salvar' });
    this.searchInput = page.getByRole('textbox', { name: 'Pesquisar disciplina...' });
    this.editButton = page.getByRole('button', { name: 'Editar' });
    this.deleteButton = page.getByRole('button', { name: 'Excluir' });
  }

  async navigateToDisciplinas() {
    await this.page.goto('https://app.avaliei.com.br/disciplinas');
    await this.page.waitForLoadState('networkidle');
  }

  async addDisciplina(disciplinaName: string, areaName: string) {
    await this.addDisciplinaButton.click();
    await this.disciplinaNameInput.fill(disciplinaName);
    await this.areaSelectButton.click();
    await this.page.getByText(areaName).click();
    await this.saveButton.click();
  }

  async searchDisciplina(disciplinaName: string) {
    await this.searchInput.click();
    await this.searchInput.fill(disciplinaName);
  }

  async editDisciplina(newName: string, newArea?: string) {
    await this.editButton.click();
    await this.disciplinaNameInput.fill(newName);
    
    if (newArea) {
      await this.areaSelectButton.click();
      await this.page.getByText(newArea).click();
    }
    
    await this.saveButton.click();
  }

  async deleteDisciplina() {
    await this.deleteButton.click();
    const confirmDelete = this.page.getByRole('button', { name: 'Excluir' }).last();
    await confirmDelete.click();
  }

  async clearDisciplinaNameInput() {
    await this.disciplinaNameInput.fill('');
  }
}
