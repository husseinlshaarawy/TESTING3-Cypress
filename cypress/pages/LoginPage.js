class LoginPage {
  url = 'https://practicesoftwaretesting.com/auth/login'

  elements = {
    email: () => cy.get('[data-test="email"]'),
    password: () => cy.get('[data-test="password"]'),
    submit: () => cy.get('[data-test="login-submit"]'),
    errorBanner: () => cy.get('[data-test="login-error"]'),
    pageTitle: () => cy.get('h3, h1'),
  }

  visit() {
    cy.visit(this.url)
    return this
  }

  fillEmail(email) {
    this.elements.email().clear().type(email)
    return this
  }

  fillPassword(password) {
    this.elements.password().clear().type(password, { log: false })
    return this
  }

  submitForm() {
    this.elements.submit().click()
    return this
  }

  login(email, password) {
    this.fillEmail(email)
    this.fillPassword(password)
    this.submitForm()
    return this
  }

  assertOnLoginPage() {
    cy.url().should('include', 'login')
    this.elements.email().should('be.visible')
    this.elements.password().should('be.visible')
    return this
  }

  assertLoginError() {
    cy.get('body').should('contain.text', 'Invalid email or password')
    cy.url().should('include', 'login')
    return this
  }
}

export default new LoginPage()
