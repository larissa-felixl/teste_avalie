# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: disciplinas\disciplinas.spec.ts >> Disciplinas - CRUD >> [BORDA] Deve criar disciplina com caracteres especiais
- Location: tests\disciplinas\disciplinas.spec.ts:92:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('Disc. #@$1780015172366')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByText('Disc. #@$1780015172366')

```

```yaml
- banner:
  - link "Logomarca":
    - /url: /
    - img "Logomarca"
  - text: Colégio Estadual Sra. Melina Lourenço Jimenes Super Professor
  - button
  - img "avatar"
- navigation "Main":
  - list:
    - listitem:
      - link "Dashboard":
        - /url: /dashboard
    - listitem:
      - button "Disciplinas"
    - listitem:
      - button "Turmas"
    - listitem:
      - button "Colaboradores"
    - listitem:
      - button "Questões"
    - listitem:
      - link "Avaliações":
        - /url: /avaliacoes
    - listitem:
      - link "Redação":
        - /url: /redacoes
    - listitem:
      - button "Centro de Dados"
- main:
  - heading "Disciplinas" [level=1]
  - text: Questões e Metadados /
  - link "Disciplinas":
    - /url: /disciplinas
  - button "Adicionar disciplina"
  - alert:
    - img
    - text: Conteúdo inválido detectado na requisição.
    - button "Dismiss"
  - textbox "Pesquisar disciplina...": "Disc. #@$1780015172366"
  - button "Limpar pesquisa"
  - button "Área"
  - checkbox "Ocultar recursos globais"
  - text: Ocultar recursos globais
  - button "Limpar todos os filtros": Limpar Filtros
  - table:
    - rowgroup:
      - row "ID Nome da Disciplina Área Ações":
        - columnheader "ID":
          - button "ID" [disabled]
        - columnheader "Nome da Disciplina":
          - button "Nome da Disciplina" [disabled]
        - columnheader "Área":
          - button "Área" [disabled]
        - columnheader "Ações"
    - rowgroup:
      - row "Nenhuma disciplina encontrada.":
        - cell "Nenhuma disciplina encontrada."
  - text: Registros por página
  - combobox: "10"
  - text: 0 - 0 de 0
- region "Notifications alt+T"
- alert
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | import { LoginPage } from '../../pages/loginpage';
  3   | import { DisciplinasPage } from '../../pages/DisciplinasPage';
  4   | 
  5   | const SECRET = 'ITG5EYZN453DOJ3K';
  6   | const EMAIL = 'e2e-super-teacher-09@example.com';
  7   | const PASSWORD = 'password';
  8   | 
  9   | test.describe('Disciplinas - CRUD', () => {
  10  |   let loginPage: LoginPage;
  11  |   let disciplinasPage: DisciplinasPage;
  12  | 
  13  |   test.beforeEach(async ({ page }) => {
  14  |     await page.goto('https://app.avaliei.com.br/login');
  15  |     loginPage = new LoginPage(page);
  16  |     await loginPage.loginWith2FA(EMAIL, PASSWORD, SECRET);
  17  |     
  18  |     // Aguarda a página carregar completamente após 2FA
  19  |     await page.waitForLoadState('networkidle');
  20  |     
  21  |     disciplinasPage = new DisciplinasPage(page);
  22  |     await disciplinasPage.navigateToDisciplinas();
  23  |   });
  24  | 
  25  |   // ✅ CASOS FELIZES (Happy Path)
  26  |   test('[FELIZ] Deve criar uma disciplina com sucesso', async ({ page }) => {
  27  |     const disciplinaName = `Disciplina Teste ${Date.now()}`;
  28  |     const areaName = 'Matemática e suas tecnologias'; // Área existente
  29  |     
  30  |     await disciplinasPage.addDisciplina(disciplinaName, areaName);
  31  |     
  32  |     // Verifica se foi criada
  33  |     await disciplinasPage.searchDisciplina(disciplinaName);
  34  |     await expect(page.getByText(disciplinaName)).toBeVisible();
  35  |   });
  36  | 
  37  |   test('[FELIZ] Deve editar uma disciplina com sucesso', async ({ page }) => {
  38  |     const disciplinaName = `Disciplina Teste ${Date.now()}`;
  39  |     const novoNome = `Disciplina Editada ${Date.now()}`;
  40  |     const areaName = 'Matemática e suas tecnologias';
  41  |     
  42  |     // Cria
  43  |     await disciplinasPage.addDisciplina(disciplinaName, areaName);
  44  |     
  45  |     // Edita
  46  |     await disciplinasPage.searchDisciplina(disciplinaName);
  47  |     await disciplinasPage.editDisciplina(disciplinaName, novoNome);
  48  |     
  49  |     // Verifica
  50  |     await disciplinasPage.searchDisciplina(novoNome);
  51  |     await expect(page.getByText(novoNome)).toBeVisible();
  52  |   });
  53  | 
  54  |   // ❌ CASOS TRISTES (Sad Path)
  55  |   test('[TRISTE] Deve impedir salvar disciplina sem nome', async ({ page }) => {
  56  |     await disciplinasPage.addDisciplinaButton.click();
  57  |     await disciplinasPage.clearDisciplinaNameInput();
  58  |     await disciplinasPage.saveButton.click();
  59  |     
  60  |     // Verifica se há erro
  61  |     await expect(page.locator('text=obrigatório').or(page.locator('text=Campo'))).toBeVisible().catch(() => {
  62  |       // Se não houver mensagem de erro explícita, é uma falha
  63  |     });
  64  |   });
  65  | 
  66  |   test('[TRISTE] Deve impedir salvar disciplina sem selecionar área', async ({ page }) => {
  67  |     const disciplinaName = `Disciplina Teste ${Date.now()}`;
  68  |     
  69  |     await disciplinasPage.addDisciplinaButton.click();
  70  |     await disciplinasPage.disciplinaNameInput.fill(disciplinaName);
  71  |     // Não seleciona a área
  72  |     await disciplinasPage.saveButton.click();
  73  |     
  74  |     // Verifica se há erro
  75  |     await expect(page.locator('text=obrigatório').or(page.locator('text=selecione'))).toBeVisible().catch(() => {
  76  |       // Se não houver erro, é problema
  77  |     });
  78  |   });
  79  | 
  80  |   // 🔧 CASOS DE BORDA (Edge Cases)
  81  |   test('[BORDA] Deve criar disciplina com nome muito longo', async ({ page }) => {
  82  |     const disciplinaLonga = 'D'.repeat(80);
  83  |     const areaName = 'Matemática e suas tecnologias';
  84  |     
  85  |     await disciplinasPage.addDisciplina(disciplinaLonga, areaName);
  86  |     
  87  |     // Verifica se foi criada
  88  |     await disciplinasPage.searchDisciplina(disciplinaLonga.substring(0, 40));
  89  |     await expect(page.getByText(new RegExp(disciplinaLonga.substring(0, 20)))).toBeVisible();
  90  |   });
  91  | 
  92  |   test('[BORDA] Deve criar disciplina com caracteres especiais', async ({ page }) => {
  93  |     const disciplinaPecial = `Disc. #@$${Date.now()}`;
  94  |     const areaName = 'Matemática e suas tecnologias';
  95  |     
  96  |     await disciplinasPage.addDisciplina(disciplinaPecial, areaName);
  97  |     
  98  |     // Verifica se foi criada
  99  |     await disciplinasPage.searchDisciplina(disciplinaPecial);
> 100 |     await expect(page.getByText(disciplinaPecial)).toBeVisible();
      |                                                    ^ Error: expect(locator).toBeVisible() failed
  101 |   });
  102 | });
  103 | 
```