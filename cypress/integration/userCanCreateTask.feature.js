describe("User can submit destination", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "GET",
      url: "**/products",
      response: "fixture:products.json",
    });
    cy.route({
      method: "POST",
      url: "**/tasks",
      response: "fixture:task_list_response.json",
    });
    cy.route({
      method: "PUT",
      url: "**/tasks/1",
      response: "fixture:task_list_update_response.json",
    });
    cy.login();
  });

  it("successfully", () => {
    let destination = "Rome";
    cy.route({
      method: "GET",
      url: "https://maps.googleapis.com/maps/api/geocode/json?**",
      response: "fixture:address_to_coords_response.json",
      params: {
        address: destination,
        key: process.env.REACT_APP_GOOGLE_APIKEY,
      },
    });
    cy.get("#create-request").click();
    cy.get("#product-1").within(() => {
      cy.get('button').should('not.exist');
    });
    cy.get("#addressInput").type("Rome");
    cy.get("#addressConfirm").click();
    cy.get("#product-1").within(() => {
      cy.get('button').should('exist');
    });
  });
});
