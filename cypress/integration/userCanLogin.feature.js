describe("User can login", () => {
  beforeEach(() => {
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
    cy.visit("/");
  });

  it("Successfully", () => {
    cy.get("#login").click();
    cy.get("#login-form").within(() => {
      cy.get("#email").type("user@mail.com");
      cy.get("#password").type("password");
      cy.get("#login-button").contains("Login").click();
    });
    cy.get("#success-message").should("contain", "Welcome user@mail.com");
  });
});

describe("User can login", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "POST",
      url: "**/auth/sign_in",
      status: "401",
      response: {
        errors: ["Invalid login credentials. Please try again."],
        success: false,
      },
    });
    cy.visit("/");
  });

  it("With invalid credentials", () => {
    cy.get("#login").click();
    cy.get("#login-form").within(() => {
      cy.get("#email").type("user@mail.com");
      cy.get("#password").type("wrong");
      cy.get("#login-button").contains("Login").click();
    });
    cy.get("#success-message").should(
      "contain",
      "Invalid login credentials. Please try again."
    );
  });
});
