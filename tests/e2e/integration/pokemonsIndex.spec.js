/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

let sendResponse;
const trigger = new Promise(resolve => {
  sendResponse = resolve;
});

describe('Pokemon App', () => {
  before(() => {
    cy.visit('/');
  });

  it('displays index page', () => {
    cy.get('.wrapper').should('have.length', 1);
    cy.get('.pokemonsWrapper').should('have.length', 1);
    cy.get('.loaderElement').should('have.length', 1);
    cy.get('h1').should('contain.text', 'Pokémons');
    cy.get('[data-testid=skeleton]').should('have.length.above', 2);
    cy.get('[data-testid=pokemonCard]').should('have.length.above', 0);
  });

  it('hides skeleton after page loaded', () => {
    cy.wait(6500);
    cy.get('[data-testid=skeleton]').should('not.exist');
    cy.get('[data-testid=pokemonName]').first().should('have.text', 'bulbasaur');
  });

  it('it scroll and load new data', () => {
    cy.get('.pokemonsWrapper')
      .find('[data-testid=pokemonsChilds]')
      .then(row => {
        cy.get('[data-testid=pokemonsChilds]').should('have.length', row.length);
        cy.scrollTo('bottom');
        cy.wait(1000);
        cy.get('[data-testid=pokemonsChilds]').should('have.length.above', row.length);
      });
  });
  it('it open modal with selected pokemon', () => {
    cy.get('[data-testid=modalContainer]').should('not.exist');
    cy.contains('It grows by molting repeatedly').should('not.exist');

    cy.contains('caterpie').click();
    cy.get('[data-testid=modalContainer]').should('exist');
    cy.contains('It grows by molting repeatedly').should('exist');

    cy.wait(1500);

    cy.get('[data-testid=closeButton]').click();
    cy.get('[data-testid=modalContainer]').should('not.exist');
    cy.contains('It grows by molting repeatedly').should('not.exist');
  });

  it('it open modal with another pokemon', () => {
    cy.get('[data-testid=modalContainer]').should('not.exist');
    cy.contains('stand the recoil of the water jets it fires').should('not.exist');

    cy.contains('blastoise').click();
    cy.get('[data-testid=modalContainer]').should('exist');
    cy.contains('stand the recoil of the water jets it fires').should('exist');

    cy.wait(1500);

    cy.get('[data-testid=closeButton]').click();
    cy.get('[data-testid=modalContainer]').should('not.exist');
    cy.contains('stand the recoil of the water jets it fires').should('not.exist');
  });
});
