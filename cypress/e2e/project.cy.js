import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import ProductPage from '../pages/ProductPage'
import CartPage from '../pages/CartPage'
import AccountPage from '../pages/AccountPage'

describe('Practice Software Testing — POM-driven E2E suite', () => {
  let data

  before(() => {
    cy.fixture('data').then((d) => { data = d })
  })

  beforeEach(() => {
    HomePage.visit()
  })

  it('TC1 — Homepage loads successfully', () => {
    HomePage.assertLoaded()
    HomePage.elements.productNames().should('have.length.greaterThan', 0)
  })

  it('TC2 — Valid login lands on My account', () => {
    HomePage.goToSignIn()
    LoginPage.login(data.user.email, data.user.password)
    AccountPage.assertLoggedIn()
  })

  it('TC3 — Invalid login shows an error', () => {
    HomePage.goToSignIn()
    LoginPage.login(data.invalidUser.email, data.invalidUser.password)
    LoginPage.assertLoginError()
  })

  it('TC4 — Search returns matching products', () => {
    HomePage.search(data.product)
    HomePage.elements.searchInput().should('have.value', data.product)
    HomePage.assertProductInResults(data.product)
  })

  it('TC5 — Open product detail page', () => {
    HomePage.search(data.product)
    HomePage.openProductByName(data.product)
    ProductPage.assertOnProductPage(data.product)
  })

  it('TC6 — Add product to cart updates the cart badge', () => {
    HomePage.search(data.product)
    HomePage.openProductByName(data.product)
    ProductPage.addToCart()
    ProductPage.assertCartCount(1)
  })

  it('TC7 — Open cart from navbar shows checkout button', () => {
    HomePage.search(data.product)
    HomePage.openProductByName(data.product)
    ProductPage.addToCart()
    HomePage.goToCart()
    CartPage.assertOnCartPage()
    CartPage.assertHasProduct(data.product)
  })

  it('TC8 — Remove item empties the cart', () => {
    HomePage.search(data.product)
    HomePage.openProductByName(data.product)
    ProductPage.addToCart()
    HomePage.goToCart()
    CartPage.removeFirst()
    cy.get('body').should(($b) => {
      expect($b.text().toLowerCase()).to.match(/empty|no products/)
    })
  })

  it('TC9 — Increasing quantity on product page reflects in cart badge', () => {
    HomePage.search(data.product)
    HomePage.openProductByName(data.product)
    ProductPage.increaseQuantityBy(1)
    ProductPage.addToCart()
    ProductPage.assertCartCount(2)
  })

  it('TC10 — Logout returns to the login page', () => {
    HomePage.goToSignIn()
    LoginPage.login(data.user.email, data.user.password)
    AccountPage.assertLoggedIn()
    AccountPage.signOut()
    cy.url().should('include', 'login')
  })

  it('TC11 — Navbar Sign-in link navigates to login', () => {
    HomePage.goToSignIn()
    LoginPage.assertOnLoginPage()
  })

  it('TC12 — Product list is rendered on home', () => {
    HomePage.elements.productNames()
      .should('have.length.greaterThan', 0)
    HomePage.elements.productNames()
      .first()
      .invoke('text')
      .should('match', /\S/)
  })

  it('TC13 — Search with no results shows zero products', () => {
    HomePage.search(data.search.noResults)
    cy.get('body').should(($b) => {
      expect($b.text().toLowerCase()).to.match(/no products|no results|0 products/)
    })
  })

  it('TC14 — Page contains expected catalog text', () => {
    HomePage.elements.body().should('contain.text', 'Tools')
    HomePage.elements.body().should('be.visible')
  })

  it('TC15 — Proceed to checkout from the cart', () => {
    HomePage.search(data.product)
    HomePage.openProductByName(data.product)
    ProductPage.addToCart()
    HomePage.goToCart()
    CartPage.assertOnCartPage()
    CartPage.proceedToCheckout()
    cy.url().should('include', 'checkout')
  })
})
