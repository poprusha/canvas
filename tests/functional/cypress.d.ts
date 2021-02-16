declare namespace Cypress {
  export type Coordinates = {
    x: number;
    y: number;
  };

  export type DragCoordinates = {
    start: Coordinates;
    end: Coordinates;
  };

  interface Chainable<Subject = any> {
    waitInitialization(selector: string): Cypress.Chainable<HTMLElement>;

    dragTo(selector: string, options: DragCoordinates, isNeedMouseup: boolean = true);
    waitForRequestAnimationFrame(value?: number);
  }
}
