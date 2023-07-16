export default class ProductListPage {
  visit() {
    cy.visit('/');
  }

  getProductListResults() {
    return cy.findByTestId('product-count');
  }

  getProductItemTitles() {
    return cy.findAllByTestId('product-container').then(($el) => {
      return $el.map((index, element) => {
        const fullText = Cypress.$(element).find('p').text();
        return fullText.split('$')[0].trim(); // get substring before the first '$'
      }).get();
    });
  }

  getLastProductTitle() {
    return this.getProductItemTitles().then((productTitles) => {
      cy.wrap(productTitles[productTitles.length - 1]).as('lastProductTitle');
    });
  }

  scrollToSelectedProduct(selectedProduct: string) {
    //ISSUE: selector is too broad
    cy.contains(selectedProduct).scrollIntoView()
    .should('be.visible')
  }

  selectProduct(productName: string) {
    //ISSUE: selector is too broad
    return cy.contains(productName)
      .first()
      .parent()
      .within(() => {
        cy.findByTestId('trigger-add-to-cart').click();
      });
  }

  filterBySize(sizeSelection: string) {
    cy.get(`span[data-testid="trigger-check"]`).contains(sizeSelection).click();
  }
}
