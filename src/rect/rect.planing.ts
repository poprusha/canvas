import { Rect } from '@app/rect/rect';
import { RectConfigurationOptions } from '@app/configuration/configuration';

export class RectPlaning {
  public static placeRects(rects: Rect[], options: RectConfigurationOptions): void {
    let placePositionY = options.beginY;

    rects.forEach((rect) => {
      rect.setX(options.beginX);
      rect.setY(placePositionY);
      rect.setInitialX(options.beginX);
      rect.setInitialY(placePositionY);
      placePositionY += options.offset + rect.getHeight();

      return rect;
    });
  }
}
