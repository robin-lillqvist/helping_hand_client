describe("When tasks are visible", () => {
  before(() => {
    cy.server();
    cy.route({
      method: "GET",
      url: "**/tasks",
      response: "fixture:task_index_response.json",
    });
    cy.route({
      method: "PUT",
      url: "**/tasks/2",
      response: "fixture:task_list_claimed_response.json",
    });
    cy.login();
  });

  it("user can successfully claim a task", () => {
    cy.get("button").contains("Offer Help").click();
    cy.get("#task-2").within(() => {
      cy.contains("Milk"); //task
      cy.contains("75.0"); //total
      cy.get("button").should("contain", "Claim Task").click();
    });
    cy.get("#success-message").should("contain", "You have claimed the task!");
  });
});
