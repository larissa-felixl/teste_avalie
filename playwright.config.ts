import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: 'html',
  timeout: 120 * 1000, // 120s para acomodar múltiplas tentativas de 2FA
  expect: {
    timeout: 10 * 1000,
  },
  use: {
    baseURL: 'https://app.avaliei.com.br',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    navigationTimeout: 60 * 1000, // Aumentado para 60s (webkit é mais lento)
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { 
        ...devices['Desktop Safari'],
        navigationTimeout: 60 * 1000, // webkit precisa de mais tempo
      },
    },

    {
      name: 'chromium-areas',
      use: { ...devices['Desktop Chrome'] },
      testMatch: '**/areas/**/*.spec.ts',
    },
  ],
});
