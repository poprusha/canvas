import 'cypress-plugin-snapshots/commands';
import DragCoordinates = Cypress.DragCoordinates;
import { testConfiguration } from '../configuration/test.configuration';

Cypress.Commands.add('waitInitialization', (selector: string) => cy.get(selector).should('have.attr', 'ready', 'true'));
Cypress.Commands.add('waitForRequestAnimationFrame', (value = 100) => cy.wait(value));

Cypress.Commands.add('dragTo', (selector: string, options: DragCoordinates, isNeedMouseup = true): void => {
  const node = cy.get(selector);
  const { y: endY, x: endX } = options.end;
  const fragment = { sw: 1, sh: 1 };
  let initImageData: Uint8ClampedArray | null = null;

  node
    .trigger('mousedown', options.start)
    .trigger('mousemove', options.end)
    .should((el: JQuery) => {
      const eu = el.get(0) as HTMLCanvasElement;
      const context = eu.getContext('2d') as CanvasRenderingContext2D;
      initImageData = initImageData || context.getImageData(endX, endY, fragment.sw, fragment.sh).data;

      //comparing point hex color before and after(to avoid sleep)
      expect(initImageData.toString()).to.not.equal(
        context.getImageData(endX, endY, fragment.sw, fragment.sh).data.toString()
      );
    });

  if (isNeedMouseup) {
    node.trigger('mouseup', { force: true });
  }
});

Cypress.on('window:before:load', () => {
  window.APP_MODE = testConfiguration.mode;
  window.APP_TEST_CONFIGURATION = testConfiguration;
});
