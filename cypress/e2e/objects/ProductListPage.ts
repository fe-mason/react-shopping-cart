export default class ProductListPage {
  visit() {
    cy.visit('/');
  }

  getProductListResults() {
    return cy.findByTestId('product-count');

  }

  scrollToSelectedProduct(selectedProduct: string) {
    cy.contains(selectedProduct).scrollIntoView()
    .should('be.visible')
  }

  selectProduct(productName: string) {
    cy.contains(productName)
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
