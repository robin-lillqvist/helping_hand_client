describe("When there is tasks to be shown", () => {
  before(() => {
    cy.server();
    cy.route({
      method: "POST",
      url: "**/auth/sign_in",
      response: "fixture:login.json",
    });
    cy.route({
      method: "GET",
      url: "**/auth/validate_token",
      response: "fixture:login.json",
    });
    cy.route({
      method: "GET",
      url: "**/tasks",
      response: "fixture:taskIndex_response.json",
    });
    cy.visit("/");
    cy.get("#login").click();
    cy.get("#login-form").within(() => {
      cy.get("#email").type("user@mail.com");
      cy.get("#password").type("password");
      cy.get("#login-button").contains("Login").click();
    });
    cy.get("#success-message").should("contain", "Welcome user@mail.com");
  });

  it("user can see list of tasks", () => {
    cy.get("button").contains("Offer help").click();
      cy.get("#task-1").within(() => {  
        cy.get('#task-1-user').should("contain","testuser2@mail.com");
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