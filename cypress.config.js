const { defineConfig } = require('cypress')
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor')
const {
  addCucumberPreprocessorPlugin,
} = require('@badeball/cypress-cucumber-preprocessor')
const {
  createEsbuildPlugin,
} = require('@badeball/cypress-cucumber-preprocessor/esbuild')

async function setupNodeEvents(on, config) {
  await addCucumberPreprocessorPlugin(on, config)

  on(
    'file:preprocessor',
    createBundler({
      plugins: [createEsbuildPlugin(config)],
    })
  )

  return config
}

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://practicesoftwaretesting.com',
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36',
    specPattern: [
      'cypress/e2e/**/*.cy.{js,ts}',
      'cypress/e2e/features/**/*.feature',
    ],
    supportFile: 'cypress/support/e2e.js',
    setupNodeEvents,
    viewportWidth: 1366,
    viewportHeight: 768,
    defaultCommandTimeout: 10000,
    video: false,
    screenshotOnRunFailure: true,
  },
})
