import { routes } from '../configuration/routes';
import { settings } from '../configuration/settings';

describe('Testing Wrapper App', () => {
  it('should see a wrapper', () => {
    cy.visit(routes.main);
    cy.waitInitialization(settings.wrapper.querySelector);
    cy.document().toMatchImageSnapshot();
  });
});
