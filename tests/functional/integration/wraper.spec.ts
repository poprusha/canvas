import { routes } from '../configuration/routes';
import { settings } from '../configuration/settings';

describe('Testing Wrapper', () => {
  it('should render', () => {
    cy.visit(routes.main);
    cy.waitInitialization(settings.wrapper.querySelector);

    cy.document().toMatchImageSnapshot();
  });
});
