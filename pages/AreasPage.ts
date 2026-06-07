import { Page, Locator } from '@playwright/test';

export class AreasPage {
  readonly page: Page;
  readonly areasLink: Locator;
  readonly addAreaButton: Locator;
  readonly areaNameInput: Locator;
  readonly saveButton: Locator;
  readonly searchInput: Locator;

  constructor(page: Page) {
    this.page = page;
    // ✅ Escopo no nav principal para evitar ambiguidade
    this.areasLink = page
      .getByRole('navigation', { name: 'Main' })
      .getByRole('link', { name: 'Áreas' });
    this.addAreaButton = page.getByRole('button', { name: 'Adicionar área' });
    this.areaNameInput = page.getByRole('textbox', { name: 'Nome da Área:' });
    this.saveButton = page.getByRole('button', { name: 'Salvar' });
    this.searchInput = page.getByRole('textbox', { name: 'Pesquisar área...' });
  }

  async navigateToAreas() {
    await this.page.goto('https://app.avaliei.com.br/areas');
    await this.page.waitForURL('**/areas');
    await this.addAreaButton.waitFor({ state: 'visible', timeout: 30000 });
  }

  async addArea(areaName: string) {
    await this.addAreaButton.click();
    await this.areaNameInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.areaNameInput.fill(areaName);
    await this.saveButton.click();
    // Espera o modal fechar como confirmação de sucesso
    await this.areaNameInput.waitFor({ state: 'hidden', timeout: 10000 });
  }

  // Submete o formulário SEM esperar sucesso — usado em testes de erro,
  // onde o modal pode fechar mas um alert aparece logo após
  async submitAreaForm(areaName: string) {
    await this.addAreaButton.click();
    await this.areaNameInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.areaNameInput.fill(areaName);
    await this.saveButton.click();
    // Aguarda qualquer desfecho: modal fecha OU alert aparece
    await Promise.race([
      this.areaNameInput.waitFor({ state: 'hidden', timeout: 10000 }),
      this.page.locator('[role="alert"]').waitFor({ state: 'visible', timeout: 10000 }),
    ]);
  }

  async searchArea(areaName: string) {
    await this.searchInput.click();
    await this.searchInput.fill(areaName);
    // ✅ Espera a tabela refletir o resultado da busca
    await this.page
      .locator('tbody tr')
      .filter({ hasText: areaName })
      .first()
      .waitFor({ state: 'visible', timeout: 10000 });
  }

  async editArea(areaName: string, newName: string) {
    // ✅ Escopa o botão Editar dentro da linha correta
    const areaRow = this.page.locator('tbody tr').filter({ hasText: areaName });
    await areaRow.waitFor({ state: 'visible', timeout: 10000 });
    await areaRow.getByRole('button', { name: 'Editar' }).click();

    await this.areaNameInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.areaNameInput.clear();
    await this.areaNameInput.fill(newName);

    await this.saveButton.click();
    // ✅ Espera o modal fechar em vez de timeout cego
    await this.areaNameInput.waitFor({ state: 'hidden', timeout: 10000 });
  }

  async deleteArea(areaName: string) {
    // ✅ Recebe o nome para escopar o botão corretamente
    const areaRow = this.page.locator('tbody tr').filter({ hasText: areaName });
    await areaRow.waitFor({ state: 'visible', timeout: 10000 });
    await areaRow.getByRole('button', { name: 'Excluir' }).click();

    // Confirma o dialog de exclusão
    const confirmButton = this.page.getByRole('button', { name: 'Excluir' }).last();
    await confirmButton.waitFor({ state: 'visible', timeout: 5000 });
    await confirmButton.click();
    // ✅ Espera a linha desaparecer como confirmação
    await areaRow.waitFor({ state: 'hidden', timeout: 10000 });
  }

  async clearAreaNameInput() {
    await this.areaNameInput.waitFor({ state: 'visible', timeout: 5000 });
    await this.areaNameInput.clear();
  }

  async isAreaVisible(areaName: string): Promise<boolean> {
    try {
      const area = this.page.locator('tbody tr').filter({ hasText: areaName });
      await area.waitFor({ state: 'visible', timeout: 5000 });
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