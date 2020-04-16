describe("User can register", () => {
  beforeEach(() => {
    cy.server();
    cy.visit("/");
  });

  it("successfully", () => {
    cy.route({
      method: "POST",
      url: "**/auth",
      response: "fixture:register.json",
      headers: {
        uid: "register@mail.com"
      }
    });
    cy.get("#register").click();
    cy.get("#register-form").within(() => {
      cy.get("#email").type("register@mail.com");
      cy.get("#password").type("password");
      cy.get("#password_confirmation").type("password");
      cy.get('button').contains('Register').click();
    });
    cy.get("#success-message").should("contain", "Welcome register@mail.com");
  });
});
