describe("Free Article view:", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it('User can see main page', () => {
    cy.get('.title').should('contain', 'Helping hand') 
  });
})