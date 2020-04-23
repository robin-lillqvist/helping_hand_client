describe("When there is tasks to be shown", () => {
  before(() => {
    cy.server();
    cy.route({
      method: "GET",
      url: "**/tasks",
      response: "fixture:task_index_response.json",
    });
    cy.loginWithLocation({latitude: 59.3490382, longitude: 18.0450214});
    cy.get("button").contains("Offer Help").click();
  });

  it("user can see list of tasks", () => {
      cy.wait(1000)
    cy.get('area[title="testuser2@mail.com"]').click({ force: true });
  });
});