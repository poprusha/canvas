import { Rect } from '@app/rect/rect';
import { RectDefaultConfiguration } from '@app/rect/rect.default.configuration';

const testOption = { width: 100, height: 70, color: 'red' };
const rect = new Rect(testOption);

test('check rect configure option', () => {
  expect(rect.getWidth()).toEqual(testOption.width);
  expect(rect.getHeight()).toEqual(testOption.height);
  expect(rect.getColor()).toEqual(testOption.color);
});

test('check rect is crossed', () => {
  rect.setDx(110);
  rect.setDy(170);

  const rectCrossed = new Rect({ width: 100, height: 70 });
  rectCrossed.setDx(155);
  rectCrossed.setDy(187);

  rect.crossedHandler([rectCrossed]);

  expect(rect.isCollided()).toBeTruthy();
  expect(rect.getColor()).toEqual(RectDefaultConfiguration.collusionRectColor);
});
