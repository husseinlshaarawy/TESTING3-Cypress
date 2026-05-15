class HomePage {
  url = 'https://practicesoftwaretesting.com/'

  elements = {
    body: () => cy.get('body'),
    searchInput: () => cy.get('[data-test="search-query"]'),
    searchSubmit: () => cy.get('[data-test="search-submit"]'),
    productNames: () => cy.get('[data-test="product-name"]'),
    productCards: () => cy.get('[data-test^="product-"]').filter('.card, a'),
    navSignIn: () => cy.get('[data-test="nav-sign-in"]'),
    navCart: () => cy.get('[data-test="nav-cart"]'),
    cartQuantity: () => cy.get('[data-test="cart-quantity"]'),
    navMenu: () => cy.get('[data-test="nav-menu"]'),
  }

  visit() {
    cy.visit(this.url)
    return this
  }

  search(term) {
    this.elements.searchInput().clear().type(`${term}{enter}`)
    return this
  }

  openProductByName(name) {
    cy.contains('[data-test="product-name"]', name)
      .should('be.visible')
      .click()
    return this
  }

  goToSignIn() {
    this.elements.navSignIn().click()
    return this
  }

  goToCart() {
    this.elements.navCart().click()
    return this
  }

  assertLoaded() {
    cy.url().should('include', 'practicesoftwaretesting')
    this.elements.body().should('be.visible')
    cy.title().should('not.be.empty')
    return this
  }

  assertProductInResults(name) {
    cy.contains('[data-test="product-name"]', name, { timeout: 10000 })
      .should('be.visible')
    return this
  }
}

export default new HomePage()
