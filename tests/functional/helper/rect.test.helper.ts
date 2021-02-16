import Coordinates = Cypress.Coordinates;
import DragCoordinates = Cypress.DragCoordinates;
import { RectProperty } from '@app/rect/rect';
import { testConfiguration } from '../configuration/test.configuration';
import { RectConfigurationOptions } from '@app/configuration/configuration';

type ToCoordinates = {
  start?: Coordinates;
  to?: Partial<Coordinates>;
};

export class RectTestHelper {
  private static readonly state: [];

  public static getFirstRectOption(): RectProperty {
    return testConfiguration.rects.items[0];
  }

  public static getSecondRectOption(): RectProperty {
    return testConfiguration.rects.items[1];
  }

  public static getRectOption(): RectConfigurationOptions {
    return testConfiguration.rects.option;
  }

  public static calcDragTo(index: number, option: ToCoordinates): DragCoordinates {
    const { y, x } = this.calcCenterRect(index);
    const { start, to } = option;

    return { start: start ?? { y, x }, end: { x: to?.x ?? y, y: to?.y ?? x } };
  }

  public static calcCenterRect(index: number): Coordinates {
    const { beginX, offset, beginY } = this.getRectOption();
    const obj = testConfiguration.rects.items.slice(0, index);

    return {
      x: testConfiguration.rects.items[index].width / 2 + beginX,
      y:
        testConfiguration.rects.items[index].height / 2 +
        beginY +
        (offset * index + obj.reduce((acc: number, prop: RectProperty) => acc + prop.height, 0)),
    };
  }
}
