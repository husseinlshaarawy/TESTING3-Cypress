// ============================================================================
// Custom Commands
// ============================================================================
// Reusable Cypress commands consumed by:
//   - cypress/e2e/project.cy.js          (POM-driven spec)
//   - cypress/e2e/step_definitions/**.js (BDD Cucumber step defs)
// ============================================================================

const HOME_URL = 'https://practicesoftwaretesting.com/'

Cypress.Commands.add('visitHome', () => {
  cy.visit(HOME_URL)
})

Cypress.Commands.add('goHome', () => {
  cy.visit(HOME_URL)
})

Cypress.Commands.add('login', (email, password) => {
  cy.get('[data-test="nav-sign-in"]').click()
  cy.url().should('include', 'login')
  cy.get('[data-test="email"]').clear().type(email)
  cy.get('[data-test="password"]').clear().type(password, { log: false })
  cy.get('[data-test="login-submit"]').click()
})

Cypress.Commands.add('logout', () => {
  cy.get('[data-test="nav-menu"]').click()
  cy.get('[data-test="nav-sign-out"]').click()
})

Cypress.Commands.add('searchProduct', (product) => {
  cy.get('[data-test="search-query"]').clear().type(`${product}{enter}`)
  cy.get('[data-test="product-name"]', { timeout: 10000 })
    .should('have.length.greaterThan', 0)
})

Cypress.Commands.add('openProduct', (product) => {
  cy.contains('[data-test="product-name"]', product)
    .should('be.visible')
    .click()
})

Cypress.Commands.add('addToCart', () => {
  cy.get('[data-test="add-to-cart"]', { timeout: 10000 })
    .should('be.visible')
    .click()
})

Cypress.Commands.add('openCart', () => {
  cy.get('[data-test="nav-cart"]', { timeout: 10000 })
    .should('be.visible')
    .click()
})

Cypress.Commands.add('verifyCartNotification', () => {
  cy.get('body', { timeout: 5000 }).should('contain', 'added')
})

Cypress.Commands.add('verifyProductInResults', (product) => {
  cy.contains('[data-test="product-name"]', product, { timeout: 10000 })
    .should('be.visible')
})

Cypress.Commands.add('assertOnHome', () => {
  cy.url().should('include', 'practicesoftwaretesting')
  cy.get('body').should('be.visible')
  cy.title().should('not.be.empty')
})
