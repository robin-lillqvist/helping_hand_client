describe("User can:", () => {
  before(() => {
    cy.visit("/");
  });

  it("see main page", () => {
    cy.get(".title").should("contain", "Helping hand");
  });

  it("navigate to create a task", () => {
    cy.get("button").contains("Create your request");
  });
});
