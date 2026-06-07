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
    // Clica especificamente no item do dropdown de sugestões
    await this.page.getByLabel('Suggestions').getByText(areaName).click();
    await this.saveButton.click();
  }

  async searchDisciplina(disciplinaName: string) {
    await this.searchInput.click();
    await this.searchInput.fill(disciplinaName);
  }

  async editDisciplina(disciplinaName: string, newName: string, newArea?: string) {
    // Encontra a linha específica da disciplina
    const disciplinaRow = this.page.locator('tbody tr').filter({ hasText: disciplinaName });
    
    // Clica no botão Editar dessa linha específica
    await disciplinaRow.locator('button:has-text("Editar")').first().click();
    
    await this.disciplinaNameInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.disciplinaNameInput.clear();
    await this.disciplinaNameInput.fill(newName);
    
    if (newArea) {
      await this.areaSelectButton.click();
      // Clica especificamente no item do dropdown de sugestões
      await this.page.getByLabel('Suggestions').getByText(newArea).click();
    }
    
    await this.saveButton.click();
  }

  async deleteDisciplina(disciplinaName: string) {
    // Encontra a linha específica da disciplina
    const disciplinaRow = this.page.locator('tbody tr').filter({ hasText: disciplinaName });
    
    // Clica no botão Excluir dessa linha específica
    await disciplinaRow.locator('button:has-text("x")').first().click();
    
    // Confirma a exclusão
    const confirmDelete = this.page.getByRole('button', { name: 'Excluir' }).last();
    await confirmDelete.click();
  }

  async clearDisciplinaNameInput() {
    await this.disciplinaNameInput.clear();
  }
}
