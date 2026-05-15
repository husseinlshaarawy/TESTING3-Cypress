class ProductPage {
  elements = {
    productName: () => cy.get('[data-test="product-name"]'),
    productPrice: () => cy.get('[data-test="unit-price"]'),
    productDescription: () => cy.get('[data-test="product-description"]'),
    addToCartBtn: () => cy.get('[data-test="add-to-cart"]'),
    increaseQty: () => cy.get('[data-test="increase-quantity"]'),
    decreaseQty: () => cy.get('[data-test="decrease-quantity"]'),
    quantityInput: () => cy.get('[data-test="quantity"]'),
    addToFavorites: () => cy.get('[data-test="add-to-favorites"]'),
    cartQuantity: () => cy.get('[data-test="cart-quantity"]'),
    toast: () => cy.get('.toast'),
  }

  addToCart() {
    this.elements.addToCartBtn().should('be.visible').click()
    return this
  }

  increaseQuantityBy(n) {
    for (let i = 0; i < n; i++) this.elements.increaseQty().click()
    return this
  }

  assertOnProductPage(name) {
    cy.url().should('include', '/product/')
    this.elements.addToCartBtn().should('be.visible')
    cy.get('body').should('contain', name)
    return this
  }

  assertCartCount(count) {
    this.elements.cartQuantity().should('have.text', String(count))
    return this
  }
}

export default new ProductPage()
