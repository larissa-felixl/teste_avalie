import { Page, Locator } from '@playwright/test';

export class DisciplinasPage {
  readonly page: Page;
  readonly disciplinasLink: Locator;
  readonly addDisciplinaButton: Locator;
  readonly disciplinaNameInput: Locator;
  readonly areaSelectButton: Locator;
  readonly saveButton: Locator;
  readonly searchInput: Locator;

  constructor(page: Page) {
    this.page = page;
    // ✅ Escopo no nav principal para evitar ambiguidade
    this.disciplinasLink = page
      .getByRole('navigation', { name: 'Main' })
      .getByRole('link', { name: 'Disciplinas' });
    this.addDisciplinaButton = page.getByRole('button', { name: 'Adicionar disciplina' });
    this.disciplinaNameInput = page.getByRole('textbox', { name: 'Nome da disciplina: *' });
    this.areaSelectButton = page.getByRole('button', { name: 'Selecione a área da disciplina' });
    this.saveButton = page.getByRole('button', { name: 'Salvar' });
    this.searchInput = page.getByRole('textbox', { name: 'Pesquisar disciplina...' });
  }

  async navigateToDisciplinas() {
    await this.page.goto('https://app.avaliei.com.br/disciplinas');
    await this.page.waitForURL('**/disciplinas');
    await this.addDisciplinaButton.waitFor({ state: 'visible', timeout: 30000 });
  }

  async addDisciplina(disciplinaName: string, areaName: string) {
    await this.addDisciplinaButton.click();
    await this.disciplinaNameInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.disciplinaNameInput.fill(disciplinaName);
    await this.areaSelectButton.click();
    // Clica especificamente no item do dropdown de sugestões
    await this.page.getByLabel('Suggestions').getByText(areaName).click();
    await this.saveButton.click();
    // Espera o modal fechar como confirmação de sucesso
    await this.disciplinaNameInput.waitFor({ state: 'hidden', timeout: 10000 });
  }

  // Submete o formulário SEM esperar sucesso — usado em testes de erro,
  // onde o modal pode fechar mas um alert aparece logo após
  async submitDisciplinaForm(disciplinaName: string, areaName: string) {
    await this.addDisciplinaButton.click();
    await this.disciplinaNameInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.disciplinaNameInput.fill(disciplinaName);
    await this.areaSelectButton.click();
    await this.page.getByLabel('Suggestions').getByText(areaName).click();
    await this.saveButton.click();
    // Aguarda qualquer desfecho: modal fecha OU alert aparece
    await Promise.race([
      this.disciplinaNameInput.waitFor({ state: 'hidden', timeout: 10000 }),
      this.page.locator('[role="alert"]').waitFor({ state: 'visible', timeout: 10000 }),
    ]);
  }

  async searchDisciplina(disciplinaName: string) {
    await this.searchInput.click();
    await this.searchInput.fill(disciplinaName);
    // ✅ Espera a tabela refletir o resultado da busca
    await this.page
      .locator('tbody tr')
      .filter({ hasText: disciplinaName })
      .first()
      .waitFor({ state: 'visible', timeout: 10000 });
  }

  async editDisciplina(disciplinaName: string, newName: string, newArea?: string) {
    // ✅ Escopa o botão Editar dentro da linha correta
    const disciplinaRow = this.page.locator('tbody tr').filter({ hasText: disciplinaName });
    await disciplinaRow.waitFor({ state: 'visible', timeout: 10000 });
    await disciplinaRow.getByRole('button', { name: 'Editar' }).click();

    await this.disciplinaNameInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.disciplinaNameInput.clear();
    await this.disciplinaNameInput.fill(newName);

    if (newArea) {
      await this.areaSelectButton.click();
      // Clica especificamente no item do dropdown de sugestões
      await this.page.getByLabel('Suggestions').getByText(newArea).click();
    }

    await this.saveButton.click();
    // ✅ Espera o modal fechar em vez de timeout cego
    await this.disciplinaNameInput.waitFor({ state: 'hidden', timeout: 10000 });
  }

  async deleteDisciplina(disciplinaName: string) {
    // ✅ Escopa o botão Excluir dentro da linha correta
    const disciplinaRow = this.page.locator('tbody tr').filter({ hasText: disciplinaName });
    await disciplinaRow.waitFor({ state: 'visible', timeout: 10000 });
    await disciplinaRow.getByRole('button', { name: 'Excluir' }).click();

    // Confirma o dialog de exclusão
    const confirmButton = this.page.getByRole('button', { name: 'Excluir' }).last();
    await confirmButton.waitFor({ state: 'visible', timeout: 5000 });
    await confirmButton.click();
    // ✅ Espera a linha desaparecer como confirmação
    await disciplinaRow.waitFor({ state: 'hidden', timeout: 10000 });
  }

  async clearDisciplinaNameInput() {
    await this.disciplinaNameInput.waitFor({ state: 'visible', timeout: 5000 });
    await this.disciplinaNameInput.clear();
  }

  async isDisciplinaVisible(disciplinaName: string): Promise<boolean> {
    try {
      const disciplina = this.page.locator('tbody tr').filter({ hasText: disciplinaName });
      await disciplina.waitFor({ state: 'visible', timeout: 5000 });
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