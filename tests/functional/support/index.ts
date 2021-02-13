import 'cypress-plugin-snapshots/commands';

Cypress.Commands.add('waitInitialization', (selector: string) => cy.get(selector).should('have.attr', 'ready', 'true'));
