import { Rect } from '@app/rect/rect';
import { RectDefaultConfiguration } from '@app/rect/rect.default.configuration';

export class RectsFixtures {
  public static load(): Rect[] {
    const color = RectDefaultConfiguration.color;

    return [
      { x: 10, y: 10, width: 150, height: 60, color },
      { x: 10, y: 10, width: 120, height: 80, color },
      { x: 10, y: 10, width: 80, height: 50, color },
      { x: 10, y: 10, width: 100, height: 40, color },
    ].map((el) => new Rect(el));
  }
}
