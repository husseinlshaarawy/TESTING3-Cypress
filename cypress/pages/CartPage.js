class CartPage {
  url = 'https://practicesoftwaretesting.com/checkout'

  elements = {
    cartItems: () => cy.get('[data-test="cart-item"]'),
    productTitles: () => cy.get('[data-test="product-title"]'),
    productQuantity: () => cy.get('[data-test="product-quantity"]'),
    productPrice: () => cy.get('[data-test="product-price"]'),
    lineTotal: () => cy.get('[data-test="line-price"]'),
    cartTotal: () => cy.get('[data-test="cart-total"]'),
    removeBtn: () => cy.get('[data-test="product-remove"], [data-test="remove"], .btn-danger'),
    proceed1: () => cy.get('[data-test="proceed-1"]'),
    emptyMsg: () => cy.contains('empty'),
  }

  visit() {
    cy.visit(this.url)
    return this
  }

  removeFirst() {
    this.elements.removeBtn().first().click()
    return this
  }

  proceedToCheckout() {
    this.elements.proceed1().click()
    return this
  }

  assertOnCartPage() {
    cy.url().should('include', 'checkout')
    this.elements.proceed1().should('be.visible')
    return this
  }

  assertHasProduct(name) {
    cy.contains('[data-test="product-title"]', name).should('be.visible')
    return this
  }

  assertItemCount(n) {
    this.elements.cartItems().should('have.length', n)
    return this
  }
}

export default new CartPage()
