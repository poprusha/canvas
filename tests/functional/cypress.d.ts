declare namespace Cypress {
  interface Chainable<Subject = any> {
    waitInitialization(selector: string): Cypress.Chainable<HTMLElement>;
  }
}
