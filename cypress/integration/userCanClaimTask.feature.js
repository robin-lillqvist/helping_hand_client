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
      url: "**/tasks/3",
      response: "fixture:task_list_claimed_response.json",
    });
    cy.login();
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
