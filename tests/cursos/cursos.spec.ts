import { test, expect } from '@playwright/test';
import { CursosPage } from '../../pages/CursosPage';
import { AuthHelper } from '../../fixtures/authHelper';

const SECRET = 'ITG5EYZN453DOJ3K';
const EMAIL = 'e2e-super-teacher-09@example.com';
const PASSWORD = 'password';

test.describe('Cursos - CRUD', () => {
  let cursosPage: CursosPage;

  test.beforeEach(async ({ page }) => {
    await page.goto('https://app.avaliei.com.br/login');
    await AuthHelper.loginWith2FA(page, EMAIL, PASSWORD, SECRET);
    await page.waitForLoadState('networkidle');

    if (page.url().includes('login')) {
      throw new Error('Falha na autenticação: ainda em página de login após 2FA');
    }

    cursosPage = new CursosPage(page);
    // ✅ navigateToCursos já lida com o submenu — sem loop de retry manual
    await cursosPage.navigateToCursos();
  });

  // ✅ CASOS FELIZES
  test('[FELIZ] Deve criar um curso com sucesso e procurar na listagem', async () => {
    const nomeCurso = `Curso Teste ${Date.now()}`;

    await cursosPage.addCurso(nomeCurso, 'Técnico');
    await cursosPage.searchCurso(nomeCurso);

    const isVisible = await cursosPage.isCursoVisible(nomeCurso);
    expect(isVisible).toBe(true);

    // Limpa o dado criado pelo teste
    await cursosPage.deleteCurso(nomeCurso);
  });

  test('[FELIZ] Deve editar um curso com sucesso e procurar na listagem', async () => {
    const nomeCurso = `Curso Teste ${Date.now()}`;
    const novoNome = `Curso Editado ${Date.now()}`;

    await cursosPage.addCurso(nomeCurso, 'Técnico');
    await cursosPage.editCurso(nomeCurso, novoNome, 'Extensão');
    await cursosPage.searchCurso(novoNome);

    const isVisible = await cursosPage.isCursoVisible(novoNome);
    expect(isVisible).toBe(true);

    // Limpa o dado criado pelo teste
    await cursosPage.deleteCurso(novoNome);
  });

  // ❌ CASOS TRISTES
  test('[TRISTE] Deve exibir erro ao cadastrar apenas o nome do curso (sem escolaridade)', async () => {
    const nomeCurso = `Curso Sem Escolaridade ${Date.now()}`;

    // ✅ submitCursoForm sem escolaridade — não assume sucesso
    await cursosPage.submitCursoForm(nomeCurso);

    // Modal deve continuar aberto (app não salvou)
    const inputVisible = await cursosPage.nomeInput
      .isVisible({ timeout: 2000 })
      .catch(() => false);
    expect(inputVisible).toBe(true);
  });

  test('[TRISTE] Deve exibir erro ao cadastrar apenas o nível de escolaridade (sem nome)', async () => {
    // ✅ submitCursoForm sem nome — não assume sucesso
    await cursosPage.submitCursoForm(undefined, 'Técnico');

    // ✅ Verifica mensagem de erro inline de campo obrigatório
    const errorMessage = await cursosPage.getInlineError();
    expect(errorMessage).toContain('Este campo é obrigatório');
  });

  // 🔲 CASOS DE BORDA
  test('[BORDA] Deve exibir erro ao tentar criar um curso com caracteres especiais', async () => {
    const nomeCurso = `Curso!@#$%^&*() ${Date.now()}`;

    await cursosPage.submitCursoForm(nomeCurso, 'Técnico');

    const errorMessage = await cursosPage.getErrorMessage();
    expect(errorMessage).toContain('Conteúdo inválido detectado');
  });

  test('[BORDA] Deve exibir erro ao tentar criar um curso com nome superior a 255 caracteres', async () => {
    const nomeCurso = 'A'.repeat(256);

    await cursosPage.submitCursoForm(nomeCurso, 'Técnico');

    const errorMessage = await cursosPage.getErrorMessage();
    expect(errorMessage).toContain('não pode ser superior a 125 caracteres');
  });
});