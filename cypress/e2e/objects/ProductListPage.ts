export default class ProductListPage {
  visit() {
    cy.visit('/');
  }

  getProductListResults() {
    return cy.get('[data-testid="product-count"]');
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
    cy.get(`input[type="checkbox"][data-testid="checkbox"][value="${sizeSelection}"]`).check({ force: true });
  }
}
