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

  getCartItem(productName: string) {
    return this.getCartContainer().within(() => {
      cy.contains(productName).parents().eq(1);
    });
  }

  getCartSubtotal() {
    return cy.get('[data-testid="subtotal-price-value"]')
  };

  removeItem(productName: string) {
    this.getCartItem(productName).findByTestId('trigger-remove-cart-product').click();
  }

  increaseQuantity(productName: string) {
    this.getCartItem(productName).findByTestId('trigger-increase-product-quantity').click();
  }

  decreaseQuantity(productName: string) {
    this.getCartItem(productName).findByTestId('trigger-decrease-product-quantity').click();
  }

  proceedToCheckout() {
    cy.findByTestId('trigger-proceed-to-checkout').click();
  }
}
