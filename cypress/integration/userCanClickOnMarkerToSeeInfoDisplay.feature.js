describe("When there is tasks to be shown", () => {
  before(() => {
    cy.server();
    cy.route({
      method: "GET",
      url: "**/tasks",
      response: "fixture:task_index_response.json",
    });
    cy.route({
      method: "PUT",
      url: "**/tasks/6",
      response: "fixture:task_list_claimed_response.json",
    });
    cy.loginWithLocation({ latitude: 59.3490382, longitude: 18.0450214 });
    cy.get("button").contains("Offer Help").click();
  });

  it("user can see specific task in map", () => {
    cy.wait(1000);
    cy.get('area[title="testuser2@mail.com"]').click({ force: true });
    cy.get("#selectedPlace-6").within(() => {
      cy.contains("testuser2@mail.com");
      cy.contains("Rice");
      cy.contains("Coca-Cola");
      cy.contains("Mustard");
      cy.get("button").should("contain", "Claim Task").click();
    });
    cy.get("#success-message").should("contain", "You have claimed the task!");
  });
});
