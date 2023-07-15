import ProductListPage from './objects/ProductListPage';
import CartDrawer from './objects/CartDrawer';

describe('Cart Functionality', function () {
  let cartDrawer: CartDrawer;
  let productListPage: ProductListPage;

  beforeEach(() => {
    cartDrawer = new CartDrawer();
    productListPage = new ProductListPage();

    productListPage.visit();
    cy.window().its('document.readyState').should('eq', 'complete');
    cy.findAllByTestId('product-count').should(
      'not.have.text',
      '0 Product(s) found'
    );
  });

  it('Shows the cart empty state', function () {
    cartDrawer.openCart();
    cartDrawer
      .getCartContainer()
      .should('contain.text', 'Add some products in the cart');
    cartDrawer.getCartQuantity().should('have.text', '0');
  });

  it('Should allow user to browse for a a product item and add it to the cart', function () {
    productListPage.getLastProductTitle().then(() => {
      cy.get('@lastProductTitle').then((productTitle) => {
        const productTitleString = productTitle.toString();
        productListPage.scrollToSelectedProduct(productTitleString);
        productListPage.selectProduct(productTitleString);
        cartDrawer
          .getCartItem(productTitleString)
          .should('contain.text', `${productTitleString}`);
        cartDrawer.getCartQuantity().should('have.text', '1');
      });
    });
  });

  it('Selects a product item and adds it to the cart', function () {
    const productSelection = 'Marine Blue T-shirt';
    const sizeSelection = 'XL';

    productListPage.filterBySize(`${sizeSelection}`);
    productListPage.scrollToSelectedProduct(productSelection);
    productListPage.selectProduct(`${productSelection}`)
    cartDrawer
      .getCartItem(productSelection)
      .should('contain.text', `${productSelection}`);
    cartDrawer.getCartQuantity().should('have.text', '1');
  });

  it('Adds a product item to the cart and edits cart contents', function () {
    const productSelection = 'Marine Blue T-shirt';

    productListPage.selectProduct(`${productSelection}`);
    cartDrawer.getCartItem(`${productSelection}`);

    //increase item quantity
    cartDrawer.increaseQuantity(`${productSelection}`);
    cartDrawer.getCartQuantity().should('have.text', '2');
    cartDrawer.increaseQuantity(`${productSelection}`);
    cartDrawer.getCartQuantity().should('have.text', '3');

    //decrease item quantity
    cartDrawer.decreaseQuantity(`${productSelection}`);
    cartDrawer.getCartQuantity().should('have.text', '2');

    //remove item from cart
    cartDrawer.removeItem(`${productSelection}`);
    cartDrawer
      .getCartContainer()
      .should('contain.text', 'Add some products in the cart');
    cartDrawer.getCartQuantity().should('contain.text', '0');
  });

  it('Adds a product item to the cart and proceeds to checkout', function () {
    const productSelection = 'Cropped Stay Groovy off white';

    productListPage.selectProduct(productSelection);
    cartDrawer
      .getCartItem(productSelection)
      .should('contain.text', `${productSelection}`);
    cartDrawer.getCartQuantity().should('have.text', '1');
    cartDrawer
      .getCartSubtotal()
      .invoke('text')
      .then(($subtotal) => {
        cartDrawer.proceedToCheckout();
        cy.on('window:alert', (text) => {
          expect(text).to.eq(`Checkout - Subtotal: ${$subtotal}`);
        });
      });
  });
});
