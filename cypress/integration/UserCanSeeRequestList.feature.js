describe("When products are visible", () => {
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
  });
});

describe("When the are NO products", () => {
  before(() => {
    cy.server();
    cy.route({
      method: "POST",
      url: "**/**",
      response: "fixture:login.json",
    });
    cy.route({
      method: "GET",
      url: "**/auth/**",
      response: "fixture:login.json",
    });
    cy.route({
      method: "GET",
      url: "**/products",
      response: "fixture:empty_products.json",
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

  it("user cannot add any products", () => {
    cy.get("button").contains("Create your request").click();
    cy.get("#product-list").should("contain", "");
  });
});
