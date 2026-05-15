import { When, Then } from '@badeball/cypress-cucumber-preprocessor'
import HomePage from '../../pages/HomePage'
import ProductPage from '../../pages/ProductPage'
import CartPage from '../../pages/CartPage'

When('I open the product {string}', (name) => {
  HomePage.openProductByName(name)
})

When('I add the product to the cart', () => {
  ProductPage.addToCart()
})

When('I open the cart', () => {
  HomePage.goToCart()
  CartPage.assertOnCartPage()
})

When('I proceed to checkout', () => {
  CartPage.proceedToCheckout()
})

Then('the cart badge should show {string}', (count) => {
  ProductPage.assertCartCount(count)
})

Then('the URL should include {string}', (fragment) => {
  cy.url().should('include', fragment)
})
