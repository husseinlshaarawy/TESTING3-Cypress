class AccountPage {
  url = 'https://practicesoftwaretesting.com/account'

  elements = {
    title: () => cy.get('h1'),
    navMenu: () => cy.get('[data-test="nav-menu"]'),
    signOut: () => cy.get('[data-test="nav-sign-out"]'),
  }

  assertLoggedIn() {
    cy.url().should('include', 'account')
    this.elements.title().should('contain', 'My account')
    return this
  }

  signOut() {
    this.elements.navMenu().click()
    this.elements.signOut().click()
    return this
  }
}

export default new AccountPage()
