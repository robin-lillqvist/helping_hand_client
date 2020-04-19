describe("When products are visible", () => {
    before(() => {
      cy.visit("/");
      cy.get("#register").click();
    cy.get("#register-form").within(() => {
      cy.get("#email").type("testuser10@mail.com");
      cy.get("#password").type("password");
      cy.get("#password_confirmation").type("password");
      cy.get('button').contains('Register').click();
    });
    cy.wait(500)
    cy.get("#Logout").contains("Logout").click();
      cy.get("#login").click();
      cy.get("#login-form").within(() => {
        cy.get("#email").type("testuser10@mail.com");
        cy.get("#password").type("password");
        cy.get("#login-button").contains("Login").click();
      });
      cy.get("#success-message").should("contain", "Welcome testuser10@mail.com");
    });
  
    it("user can successfully add products", () => {
      cy.get("button").contains("Create your request").click();
      cy.get("#product-1").within(() => {
        cy.contains("Milk"); //product
        cy.get("button").should("contain", "Add").click();
        cy.get("button").should("contain", "Add").click();
        cy.get("button").should("contain", "Add").click();
        cy.get("button").should("contain", "Add").click();
        cy.get("button").should("contain", "Add").click();
      });
      cy.get("#request-list").within(() => {
        cy.contains("Milk"); //product
        cy.get("button").should("contain", "Place Order").click();
      });
      cy.get("#success-message").should(
        "contain",
        "The product has been added to your request"
      );
    });
  });
  