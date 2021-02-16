import { Rect, RectProperty } from '@app/rect/rect';

export class RectTransformer {
  public static transform(items: RectProperty[]): Rect[] {
    return items.map((el) => new Rect(el));
  }
}
