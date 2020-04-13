describe("when products are visible", () => {
  before(() => {
    cy.server();
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/products",
      response: "fixture:products.json",
    });
    cy.visit("/");
  });
  it("successfully", () => {
    cy.get("#products").within(() => {
      cy.contains("Potatoes"); //product
      cy.contains("98"); //price
    });
  });
});

describe("when the are NO products", () => {
  before(() => {
    cy.server();
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/products",
      response: [],
    });
    cy.visit("/");
  });
  it("unsuccessfully", () => {
    cy.get("#products").should("not.exist");
  });
});
