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
  readonly editButton: Locator;
  readonly deleteButton: Locator;
  readonly closeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.turmasButton = page.getByRole('button', { name: 'Turmas' });
    this.cursosLink = page.getByRole('link', { name: 'Cursos' });
    this.addCursoButton = page.getByRole('button', { name: 'Adicionar Curso' });
    this.nomeInput = page.getByRole('textbox', { name: 'Nome do Curso: *' });
    this.escolaridadeButton = page.getByRole('button', { name: 'Nível de Escolaridade' });
    this.saveButton = page.getByRole('button', { name: 'Salvar' });
    this.searchInput = page.getByRole('textbox', { name: 'Pesquisar curso...' });
    this.editButton = page.getByRole('button', { name: 'Editar' });
    this.deleteButton = page.getByRole('button', { name: 'Excluir' });
    this.closeButton = page.getByRole('button', { name: 'Close' });
  }

  async navigateToCursos() {
    await this.turmasButton.click();
    await this.page.waitForTimeout(500);
    await this.cursosLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async addCurso(nomeCurso: string, escolaridade?: string) {
    await this.addCursoButton.click();
    await this.nomeInput.waitFor({ state: 'visible', timeout: 10000 });
    
    if (nomeCurso) {
      await this.nomeInput.fill(nomeCurso);
    }
    
    if (escolaridade) {
      await this.escolaridadeButton.click();
      await this.page.getByRole('option', { name: escolaridade }).click();
    }
    
    await this.page.waitForTimeout(500);
    await this.saveButton.click();
    await this.page.waitForTimeout(1000);
  }

  async searchCurso(nomeCurso: string) {
    await this.searchInput.click();
    await this.searchInput.fill(nomeCurso);
    await this.page.waitForTimeout(1500);
  }

  async clearSearch() {
    await this.page.getByRole('button', { name: 'Limpar pesquisa' }).click();
    await this.page.waitForTimeout(1000);
  }

  async editCurso(nomeCurso: string, novoNome?: string, novaEscolaridade?: string) {
    await this.searchCurso(nomeCurso);
    await this.editButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.editButton.click();
    
    if (novoNome) {
      await this.nomeInput.waitFor({ state: 'visible', timeout: 10000 });
      await this.nomeInput.click();
      await this.nomeInput.press('Control+A');
      await this.nomeInput.fill(novoNome);
    }
    
    if (novaEscolaridade) {
      await this.escolaridadeButton.click();
      await this.page.getByRole('option', { name: novaEscolaridade }).click();
    }
    
    await this.page.waitForTimeout(500);
    await this.saveButton.click();
    await this.page.waitForTimeout(1000);
  }

  async deleteCurso(nomeCurso: string) {
    await this.searchCurso(nomeCurso);
    await this.deleteButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.deleteButton.click();
    
    // Confirma o delete (pode estar em um modal)
    const confirmDelete = this.page.getByRole('button', { name: 'Excluir' }).last();
    await confirmDelete.click();
    await this.page.waitForTimeout(1000);
  }

  async isCursoVisible(nomeCurso: string): Promise<boolean> {
    try {
      const row = this.page.getByRole('row').filter({ hasText: nomeCurso });
      await row.waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  async getErrorMessage(): Promise<string> {
    try {
      // Procura por erro em diferentes seletores
      const errorLocator = this.page.locator('[role="alert"]').first();
      await errorLocator.waitFor({ state: 'visible', timeout: 5000 });
      return await errorLocator.textContent() || '';
    } catch {
      return '';
    }
  }

  async hasErrorMessage(): Promise<boolean> {
    try {
      const errorLocator = this.page.locator('[role="alert"]').first();
      return await errorLocator.isVisible({ timeout: 3000 }).catch(() => false);
    } catch {
      return false;
    }
  }
}
