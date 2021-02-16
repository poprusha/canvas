import { settings } from '../configuration/settings';
import { routes } from '../configuration/routes';

describe('Testing Board App', () => {
  it('should see a board with rects', () => {
    cy.visit(routes.main);
    cy.waitInitialization(settings.board.querySelector);

    cy.document().toMatchImageSnapshot();
  });

  it('should see resizable', () => {
    cy.visit(routes.main);
    cy.waitInitialization(settings.board.querySelector);

    cy.get('#board').invoke('height').should('not.be.gte', settings.window.size.height);
    cy.get('#board').invoke('width').should('not.be.gte', settings.window.size.width);
    cy.viewport(settings.window.testSize.width, settings.window.testSize.height);
    cy.get('#board').invoke('height').should('not.be.gte', settings.window.testSize.height);
    cy.get('#board').invoke('width').should('not.be.gte', settings.window.testSize.width);

    cy.document().toMatchImageSnapshot();
  });
});
