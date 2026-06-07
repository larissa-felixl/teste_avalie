import { Page, Locator } from '@playwright/test';

export class AreasPage {
  readonly page: Page;
  readonly areasLink: Locator;
  readonly addAreaButton: Locator;
  readonly areaNameInput: Locator;
  readonly saveButton: Locator;
  readonly searchInput: Locator;
  readonly editButton: Locator;
  readonly deleteButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.areasLink = page.locator('a[href="/areas"]');
    this.addAreaButton = page.getByRole('button', { name: 'Adicionar área' });
    this.areaNameInput = page.getByRole('textbox', { name: 'Nome da Área:' });
    this.saveButton = page.getByRole('button', { name: 'Salvar' });
    this.searchInput = page.getByRole('textbox', { name: 'Pesquisar área...' });
    this.editButton = page.getByRole('button', { name: 'Editar' });
    this.deleteButton = page.getByRole('button', { name: 'Excluir' });
  }

  async navigateToAreas() {
    await this.page.goto('https://app.avaliei.com.br/areas');
    await this.page.waitForLoadState('networkidle');
  }

  async addArea(areaName: string) {
    await this.addAreaButton.click();
    await this.areaNameInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.areaNameInput.fill(areaName);
    await this.page.waitForTimeout(500);
    await this.saveButton.click();
    await this.page.waitForTimeout(1000); // Aguarda salvar
  }

  async searchArea(areaName: string) {
    await this.searchInput.click();
    await this.searchInput.fill(areaName);
    await this.page.waitForTimeout(1500); // Aguarda busca
  }

  async editArea(areaName: string, newName: string) {
    // Busca a área específica na tabela e clica no botão Editar dela
    // Procura pela linha que contém o nome da área
    const areaRow = this.page.locator('tbody tr').filter({ hasText: areaName });
    
    // Clica no botão Editar dessa linha específica
    await areaRow.locator('button:has-text("Editar")').first().click();
    
    // Aguarda o input ficar visível
    await this.areaNameInput.waitFor({ state: 'visible', timeout: 10000 });
    
    // Limpa e preenche com o novo nome
    await this.areaNameInput.clear();
    await this.areaNameInput.fill(newName);
    
    await this.page.waitForTimeout(500);
    await this.saveButton.click();
    await this.page.waitForTimeout(1000);
  }

  async deleteArea() {
    await this.deleteButton.click();
    // Confirma a exclusão se houver modal
    const confirmDelete = this.page.getByRole('button', { name: 'Excluir' }).last();
    await confirmDelete.click();
  }

  async clearAreaNameInput() {
    await this.areaNameInput.clear();
  }
  
  async getAreaByName(areaName: string): Promise<Locator> {
    return this.page.locator('tbody tr').filter({ hasText: areaName });
  }
  
  async isAreaVisible(areaName: string): Promise<boolean> {
    try {
      const area = await this.getAreaByName(areaName);
      return await area.isVisible({ timeout: 5000 });
    } catch {
      return false;
    }
  }
}
