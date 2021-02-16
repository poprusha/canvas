import { Rect } from '@app/rect/rect';
import { RectDefaultConfiguration } from '@app/rect/rect.default.configuration';

export class RectsFixtures {
  public static load(): Rect[] {
    const color = RectDefaultConfiguration.color;

    return [
      { x: 10, y: 10, width: 100, height: 70, color },
      { x: 10, y: 10, width: 100, height: 70, color },
      { x: 10, y: 10, width: 100, height: 70, color },
      { x: 10, y: 10, width: 100, height: 70, color },
    ].map((el) => new Rect(el));
  }
}
