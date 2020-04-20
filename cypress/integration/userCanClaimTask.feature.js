describe("When tasks are visible", () => {
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
      response: "fixture:task_index_response.json",
    });
    cy.route({
      method: "PUT",
      url: "**/tasks/3",
      response: "fixture:task_list_claimed_response.json",
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

  it("user can successfully claim a task", () => {
    cy.get("button").contains("Offer Help").click();
    cy.get("#task-3").within(() => {
      cy.contains("Rice"); //task
      cy.contains("129.0"); //total
      cy.get("button").should("contain", "Claim Task").click();
    });
    cy.get("#success-message").should("contain", "You have claimed the task!");
  });
});
