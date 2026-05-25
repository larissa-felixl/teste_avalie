import { Page, Locator } from "@playwright/test";
import { OTPage } from "./OTPage";

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByLabel("Email");
    this.passwordInput = page.getByRole("textbox", { name: "Senha" });
    this.loginButton = page.getByRole("button", { name: "Entrar" });
  }

  // Fluxo feliz (happy path) sem 2FA
  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  // Fluxo com 2FA
  async loginWith2FA(email: string, password: string, secret: string) {
    // Primeiro faz login normal
    await this.login(email, password);
    
    // Aguarda a página de 2FA carregar
    await this.page.waitForLoadState('networkidle');
    
    // Verifica o código 2FA
    const otPage = new OTPage(this.page);
    await otPage.verifyTwoFactorCode(secret);
  }

  // Asserts são nas specs, não aqui no POM
}
