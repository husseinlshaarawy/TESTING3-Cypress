// Verify cypress.config.js loads and exposes the expected shape,
// and that the cucumber preprocessor modules are importable.
const path = require('path')

let failed = 0

function check(name, fn) {
  try {
    fn()
    console.log('OK   ' + name)
  } catch (e) {
    failed++
    console.log('FAIL ' + name)
    console.log('     ' + e.message)
  }
}

check('cypress.config.js loads', () => {
  const cfg = require(path.join(__dirname, '..', 'cypress.config.js'))
  if (!cfg || !cfg.e2e) throw new Error('cfg.e2e missing')
  if (cfg.e2e.baseUrl !== 'https://practicesoftwaretesting.com') {
    throw new Error('baseUrl wrong: ' + cfg.e2e.baseUrl)
  }
  if (!Array.isArray(cfg.e2e.specPattern)) {
    throw new Error('specPattern should be an array')
  }
  if (typeof cfg.e2e.setupNodeEvents !== 'function') {
    throw new Error('setupNodeEvents not a function')
  }
})

check('@badeball/cypress-cucumber-preprocessor importable', () => {
  const m = require('@badeball/cypress-cucumber-preprocessor')
  if (typeof m.addCucumberPreprocessorPlugin !== 'function') {
    throw new Error('addCucumberPreprocessorPlugin missing')
  }
})

check('@badeball/cypress-cucumber-preprocessor/esbuild importable', () => {
  const m = require('@badeball/cypress-cucumber-preprocessor/esbuild')
  if (typeof m.createEsbuildPlugin !== 'function') {
    throw new Error('createEsbuildPlugin missing')
  }
})

check('@bahmutov/cypress-esbuild-preprocessor importable', () => {
  const fn = require('@bahmutov/cypress-esbuild-preprocessor')
  if (typeof fn !== 'function') throw new Error('default export not a function')
})

check('fixture data.json has expected shape', () => {
  const data = require(path.join(__dirname, '..', 'cypress', 'fixtures', 'data.json'))
  if (!data.user || !data.user.email) throw new Error('user.email missing')
  if (!data.invalidUser || !data.invalidUser.email) throw new Error('invalidUser.email missing')
  if (!data.product) throw new Error('product missing')
  if (!data.search || !data.search.noResults) throw new Error('search.noResults missing')
})

check('.cypress-cucumber-preprocessorrc.json valid JSON', () => {
  const cfg = require(path.join(__dirname, '..', '.cypress-cucumber-preprocessorrc.json'))
  if (!Array.isArray(cfg.stepDefinitions)) throw new Error('stepDefinitions array missing')
})

console.log('\n' + (failed ? 'FAIL' : 'OK') + ' (' + failed + ' failures)')
process.exit(failed ? 1 : 0)
