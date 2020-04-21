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
    cy.login();
  });

  it("Successfully", () => {
    cy.route({
      method: "GET",
      url: "https://maps.google.com/maps/api/geocode/json?**",
      response: "fixture:address_to_coords_response.json",
      params: {
        address: "Rome",
        key: process.env.REACT_APP_GOOGLE_APIKEY,
      },
    });
    cy.get("#create-request").click();
    cy.get("#product-1").should("not.exist");
    cy.get("#addressInput").type("Rome");
    cy.get("#addressConfirm").click();
    cy.route({
      method: "PUT",
      url: "**/tasks/1",
      response: "fixture:task_list_updated_total.json",
    });
    // cy.get("#product-1").within(() => {
      cy.get("button#1").should("exist");
      cy.get("button#1").click();
    // });
    cy.get("#request-list").within(() => {
      cy.get("#Potatoes").should("contain", "1 x Potatoes");
      cy.get("#orderTotal").should("contain", "98.0");
    });
    cy.get("#product-6").within(() => {
      cy.get("button#6").click();
      cy.get("button#6").click();
      cy.get("button#6").click();
      cy.get("button#6").click();
    });
    cy.route({
      method: "PUT",
      url: "**/tasks/1",
      response: "fixture:task_confirmation_response.json",
    });
    cy.get("#confirm-task").click();
    cy.get("#success-message").should(
      "contain",
      "Your task has been confirmed"
    );
  });

  it("Unsuccessfully - Bad address", () => {
    cy.route({
      method: "GET",
      url: "https://maps.google.com/maps/api/geocode/json?**",
      response: "fixture:address_to_coords_response.json",
      params: {
        address: "kjfhjgfjhgfjhf",
        key: process.env.REACT_APP_GOOGLE_APIKEY,
      },
    });
    cy.get("#create-request").click();
    cy.get("#product-1").should("not.exist");
    cy.get("#addressInput").type("kjfhjgfjhgfjhf");
    cy.get("#addressConfirm").click();

    cy.get("#success-message").should(
      "contain",
      "Your address could not be confirmed"
    );
  });

  it("Unsuccessfully - too few items", () => {
    cy.route({
      method: "GET",
      url: "https://maps.google.com/maps/api/geocode/json?**",
      response: "fixture:address_to_coords_bad_address_response.json",
      params: {
        address: "Rome",
        key: process.env.REACT_APP_GOOGLE_APIKEY,
      },
    });
    cy.get("#create-request").click();
    cy.get("#product-1").should("not.exist");
    cy.get("#addressInput").type("Rome");
    cy.get("#addressConfirm").click();
    cy.route({
      method: "PUT",
      url: "**/tasks/1",
      response: "fixture:task_list_4_items_updated_total.json",
    });
    // cy.get("#product-6").within(() => {
      cy.get("button#6").click();
      cy.get("button#6").click();
      cy.get("button#6").click();
      cy.get("button#6").click();
    // });
    cy.route({
      method: "PUT",
      url: "**/tasks/1",
      response: "fixture:task_confirmation_too_few_items_response.json",
      status: 403
    });
    cy.get("#confirm-task").click();
    cy.get("#success-message").should("contain","You have to pick at least 5 products.");
  });

  it("Unsuccessfully - too many items", () => {
    cy.route({
      method: "GET",
      url: "https://maps.googleapis.com/maps/api/geocode/json?**",
      response: "fixture:address_to_coords_bad_address_response.json",
      params: {
        address: "Rome",
        key: process.env.REACT_APP_GOOGLE_APIKEY,
      },
    });
    cy.get("#create-request").click();
    cy.get("#product-1").should("not.exist");
    cy.get("#addressInput").type("Rome");
    cy.get("#addressConfirm").click();
    cy.route({
      method: "PUT",
      url: "**/tasks/1",
      response: "fixture:task_list_41_items_updated_total.json",
    });
    // cy.get("#product-6").within(() => {
      cy.get("button#6").click();
      cy.get("button#6").click();
      cy.get("button#6").click();
      cy.get("button#6").click();
      cy.get("button#6").click();
      cy.get("button#6").click();
      cy.get("button#6").click();
      cy.get("button#6").click();
      cy.get("button#6").click();
      cy.get("button#6").click();
      cy.get("button#6").click();
      cy.get("button#6").click();
      cy.get("button#6").click();
      cy.get("button#6").click();
      cy.get("button#6").click();
      cy.get("button#6").click();
      cy.get("button#6").click();
      cy.get("button#6").click();
      cy.get("button#6").click();
      cy.get("button#6").click();
      cy.get("button#6").click();
      cy.get("button#6").click();
      cy.get("button#6").click();
      cy.get("button#6").click();
      cy.get("button#6").click();
      cy.get("button#6").click();
      cy.get("button#6").click();
      cy.get("button#6").click();
      cy.get("button#6").click();
      cy.get("button#6").click();
      cy.get("button#6").click();
      cy.get("button#6").click();
      cy.get("button#6").click();
      cy.get("button#6").click();
      cy.get("button#6").click();
      cy.get("button#6").click();
      cy.get("button#6").click();
      cy.get("button#6").click();
      cy.get("button#6").click();
      cy.get("button#6").click();
      cy.get("button#6").click();
    // });
    cy.route({
      method: "PUT",
      url: "**/tasks/1",
      response: "fixture:task_confirmation_too_many_items_response.json",
      status: 403
    });
    cy.get("#confirm-task").click();
    cy.get("#success-message").should("contain","You have selected too many products.");
  });

});
