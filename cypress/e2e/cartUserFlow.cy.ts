import ProductListPage from './objects/ProductListPage';
import CartDrawer from './objects/CartDrawer';

describe('Cart Functionality', function () {
  let cartDrawer;
  let productListPage;

  beforeEach(() => {
    cartDrawer = new CartDrawer();
    productListPage = new ProductListPage();

    productListPage.visit();
    cy.window().its('document.readyState').should('eq', 'complete');
    
    cy.get('[data-testid="product-count"]').should('not.contain.text', '0 Product(s) found');
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
    const sizeSelection = 'XL';

    productListPage.filterBySize(`${sizeSelection}`);
    productListPage.scrollToSelectedProduct(productSelection);

    productListPage.selectProduct(`${productSelection}`);

    cartDrawer.getCartContainer().should('contain.text', `${productSelection}`);
    cartDrawer.getCartQuantity().should('have.text', '1'); //TODO: test this doesn't work for e.g. '10', '11'

    cartDrawer.getCartItem(`${productSelection}`);
    cartDrawer.increaseQuantity(`${productSelection}`);
    cartDrawer.increaseQuantity(`${productSelection}`);
    cartDrawer.getCartQuantity().should('have.text', '3');

    cartDrawer.decreaseQuantity(`${productSelection}`);
    cartDrawer.getCartQuantity().should('have.text', '2');

    cartDrawer.removeItem(`${productSelection}`);
    cartDrawer
    .getCartContainer()
    .should('contain.text', 'Add some products in the cart');
    cartDrawer.getCartQuantity().should('contain.text', '0');
  });

  it('Adds product item to cart and proceeds to checkout', function () {
    const productSelection = 'Cropped Stay Groovy off white';

    productListPage.selectProduct(productSelection);

    cartDrawer.getCartContainer().should('contain.text', `${productSelection}`);
    cartDrawer.getCartQuantity().should('have.text', '1');
    cartDrawer.getCartSubtotal().invoke('text').then(($subtotal) => {
      cartDrawer.proceedToCheckout();
      cy.on('window:alert',(text)=>{
        expect(text).to.contain(`Checkout - Subtotal: ${$subtotal}`);
      })
    })
  });
});
