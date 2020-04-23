// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
import stubLocation from "./stubLocation";

Cypress.Commands.add("login", () => {
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
  cy.visit("/");
  cy.get("#login").click();
  cy.get("#login-form").within(() => {
    cy.get("#email").type("user@mail.com");
    cy.get("#password").type("password");
    cy.get("#login-button").contains("Login").click();
  });
  cy.get("#success-message").should("contain", "Welcome user@mail.com");
});

Cypress.Commands.add("loginWithLocation", (options) => {
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
  cy.visit("/", stubLocation({latitude: options.latitude, longitude: options.longitude}));
  cy.get("#login").click();
  cy.get("#login-form").within(() => {
    cy.get("#email").type("user@mail.com");
    cy.get("#password").type("password");
    cy.get("#login-button").contains("Login").click();
  });
  cy.get("#success-message").should("contain", "Welcome user@mail.com");
});