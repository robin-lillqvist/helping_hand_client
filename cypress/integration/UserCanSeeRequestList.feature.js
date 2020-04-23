describe("When there is tasks to be shown", () => {
  before(() => {
    cy.server();
    cy.route({
      method: "GET",
      url: "**/tasks",
      response: "fixture:task_index_response.json",
    });
    cy.login();
  });

  it("user can see list of tasks", () => {
    cy.get("button").contains("Offer Help").click();
      cy.get("#task-1").within(() => {  
        cy.get('#task-1-user').should("contain","testuser4@mail.com");
        cy.get('#task-product-1').should("contain","Milk");
        cy.get('#task-product-2').should("contain","Coca-Cola");
        cy.get('#task-product-3').should("contain","Mustard");
        cy.get('#task-1-total').should("contain","75.0");
      })
      cy.get("#task-9").within(() => {  
        cy.get('#task-9-user').should("contain","testuser10@mail.com");
        cy.get('#task-product-1').should("contain","Milk");
        cy.get('#task-product-2').should("contain","Bread");
        cy.get('#task-product-3').should("contain","Eggs");
        cy.get('#task-9-total').should("contain","75.0");
      })
  });
});