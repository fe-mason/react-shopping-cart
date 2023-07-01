export default class ProductListPage {
  visit() {
    cy.visit('/');
  }

  getProductListResults() {
    return cy.get('[data-testid="product-count"]');
  }

  selectProduct(productName) {
    cy.contains(productName)
      .first()
      .parent()
      .within(() => {
        cy.findByTestId('trigger-add-to-cart').click();
      });
  }
}
