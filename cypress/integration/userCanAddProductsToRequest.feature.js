describe("when products are visible", () => {
  before(() => {
    //   cy.exec("yarn start")
    cy.server();
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/products",
      response: "fixture:products.json",
    });
    cy.route({
        method: "POST",
        url: "http://localhost:3000/api/v1/products",
        response: "fixture:products.json",
      });
    cy.visit("/");
  });

  it("successfully", () => {
    cy.get("button").contains("Create your request").click();
    cy.get("#product-1").within(() => {
      cy.contains("Potatoes"); //product
      cy.contains("98"); //price
      cy.get("button").should("contain", "Add").click();
    });
    cy.get("#request-list").within(() => {
        cy.contains("Potatoes"); //product
    });

  });
});
