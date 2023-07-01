export default class CartDrawer {
  openCart() {
    cy.findByTestId('trigger-cart-drawer-open').click();
  }

  getCartContainer() {
    return cy.findByTestId('cart-content-container');
  }

  getCartQuantity() {
    return cy.findByTestId('cart-quantity-indicator');
  }

  // getCartItem(productName) {
  //     return cy.contains('selector', productName);
  // }

  // removeItem(productName) {
  //     this.getCartItem(productName).findByTestId('selector').click();
  // }

  // increaseQuantity(productName, quantity) {
  //     this.getCartItem(productName).findByTestId('selector').click();
  // }

  // decreaseQuantity(productName, quantity) {
  //     this.getCartItem(productName).findByTestId('selector').click();
  // }

  // proceedToCheckout() {
  //     findByTestId('selector').click();
  // }
}
