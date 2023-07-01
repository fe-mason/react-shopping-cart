import ProductListPage from './objects/ProductListPage.js';
import CartDrawer from './objects/CartDrawer.js';

describe('Cart Functionality', function () {
  let cartDrawer;
  let productListPage;

  beforeEach(() => {
    cartDrawer = new CartDrawer();
    productListPage = new ProductListPage();

    productListPage.visit();
    cy.window().its('document.readyState').should('eq', 'complete');
    cy.get('[data-testid="product-count"]')
      .invoke('text')
      .then((text) => {
        expect(text).to.match(/\d+ Product\(s\)? found/i);
      });
  });

  it('Shows the cart empty state', function () {
    cartDrawer.openCart();
    cartDrawer
      .getCartContainer()
      .should('contain.text', 'Add some products in the cart');
    cartDrawer.getCartQuantity().should('contain.text', '0');
  });

  it('Adds product item to cart and edits cart contents', function () {
    const productSelection = 'Marine Blue T-shirt';

    // Scroll to seleted product
    // Filter by size
    productListPage.selectProduct(productSelection);

    cartDrawer.getCartContainer().should('contain.text', `${productSelection}`);
    cartDrawer.getCartQuantity().should('have.text', '1'); //TODO: test this doesn't work for e.g. '10', '11'

    // Change quantity of product
    // cartDrawer.updateQuantity('productSelection', 2);

    // Remove product from the cart
    // cartDrawer.removeItem('productSelection');

    // Assert that product is removed from the cart
    // cartDrawer.getCartContainer().should('not.contain.text', `${productSelection}`);
    // cartDrawer.getCartQuantity().should('have.text', '0'); //TODO: test this doesn't work for e.g. '10'

    // Proceed to checkout
    // cartDrawer.proceedToCheckout();
  });
});
