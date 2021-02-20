import { settings } from '../configuration/settings';
import { RectTestHelper } from '../helper/rect.test.helper';
import { routes } from '../configuration/routes';

describe('Testing Rect', () => {
  it('rect should be is draggable', () => {
    cy.visit(routes.main);
    cy.waitInitialization(settings.board.querySelector);

    cy.dragTo(settings.board.querySelector, RectTestHelper.calcDragTo(0, { to: { x: 350 } }));

    cy.document().toMatchImageSnapshot();
  });

  it('rect should be change color if collision', () => {
    cy.visit(routes.main);
    cy.waitInitialization(settings.board.querySelector);

    cy.dragTo(settings.board.querySelector, RectTestHelper.calcDragTo(0, { to: { x: 350, y: 150 } }));
    cy.dragTo(settings.board.querySelector, RectTestHelper.calcDragTo(2, { to: { x: 300, y: 130 } }), false);

    cy.document().toMatchImageSnapshot();
  });

  it('rect should be return to initial position', () => {
    cy.visit(routes.main);
    cy.waitInitialization(settings.board.querySelector);

    const moveTo = { x: 350, y: 150 };

    cy.dragTo(settings.board.querySelector, RectTestHelper.calcDragTo(0, { to: moveTo }));
    cy.dragTo(settings.board.querySelector, RectTestHelper.calcDragTo(0, { to: { x: 100, y: 50 }, start: moveTo }));

    cy.waitForRequestAnimationFrame();

    cy.document().toMatchImageSnapshot();
  });

  it('rect should be cling to other rect', () => {
    cy.visit(routes.main);
    cy.waitInitialization(settings.board.querySelector);

    cy.dragTo(settings.board.querySelector, RectTestHelper.calcDragTo(0, { to: { x: 500, y: 150 } }));
    cy.dragTo(
      settings.board.querySelector,
      RectTestHelper.calcDragTo(1, { to: { x: 500 - RectTestHelper.getSecondRectOption().width - 15, y: 150 } })
    );

    cy.document().toMatchImageSnapshot();
  });

  it('rect should be return to start position', () => {
    cy.visit(routes.main);
    cy.waitInitialization(settings.board.querySelector);

    const firstRectCoordinates = { x: 400, y: 100 };

    cy.dragTo(settings.board.querySelector, RectTestHelper.calcDragTo(0, { to: firstRectCoordinates }));

    const moveTo = { x: 400, y: 125 + RectTestHelper.getFirstRectOption().height + 25 };

    cy.dragTo(settings.board.querySelector, RectTestHelper.calcDragTo(1, { to: moveTo }));

    cy.dragTo(settings.board.querySelector, RectTestHelper.calcDragTo(1, { to: firstRectCoordinates, start: moveTo }));

    cy.waitForRequestAnimationFrame();

    cy.document().toMatchImageSnapshot();
  });
});
