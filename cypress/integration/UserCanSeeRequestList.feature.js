describe('When products are visible', () => {
  before(() => {
    cy.exec("yarn start")
    cy.server();
    cy.route({
      method: 'GET',
      url: 'http://localhost:3000/api/v1/products',
      response: 'fixture:products.json'
    })
    cy.visit('/')
  })
  it('user can successfully create a request', () => {
    cy.get("button")
        .contains("Create your request")
        .click();
    ;
    cy.get("#product-list").within(() => {
      cy.contains('Potatoes'); //product
      cy.contains('98'); //price
    })
  })
});
describe('When the are NO products', () => {
  before(() => {
    cy.server();
    cy.route({
      method: 'GET',
      url: 'http://localhost:3000/api/v1/products',
      response: ''
    })
    cy.visit("/")
  })

  it('user cannot add any products', () => {
    cy.get("button")
    .contains("Create your request")
    .click();
    cy.get('#product-list').should("contain", "")
  })
});
