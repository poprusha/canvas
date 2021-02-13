import 'jest-canvas-mock';
import { WrapperConfiguration } from '@app/wrapper/wrapper.configuration';
import { Wrapper } from '@app/wrapper/wrapper';
import { wrapperInternalConfiguration } from '@app/wrapper/wrapper.internal.configuration';

describe('Wrapper: ', () => {
  test('config should be equal', () => {
    const configuration = {
      largeDivisionsHeight: 10,
      smallDivisionsHeight: 3,
      rulerStep: {
        x: 25,
        y: 25,
      },
      rulerNumberLabelOptions: {
        step: {
          x: 22,
          y: 28,
        },
        position: {
          startX: {
            x: 0,
            y: 9,
          },
          startY: {
            x: 5,
            y: 28,
          },
        },
      },
      correctionSide: {
        y: 20,
        x: 20,
      },
      font: '11px Arial',
    };
    const wrapperConfiguration = new WrapperConfiguration(configuration);

    expect(wrapperConfiguration.getLargeDivisionsHeight()).toEqual(configuration.largeDivisionsHeight);
    expect(wrapperConfiguration.getSmallDivisionsHeight()).toEqual(configuration.smallDivisionsHeight);
    expect(wrapperConfiguration.getRulerStepX()).toEqual(configuration.rulerStep.x);
    expect(wrapperConfiguration.getRulerStepY()).toEqual(configuration.rulerStep.y);
    expect(wrapperConfiguration.getRulerLabelStepX()).toEqual(configuration.rulerNumberLabelOptions.step.x);
    expect(wrapperConfiguration.getRulerLabelStepY()).toEqual(configuration.rulerNumberLabelOptions.step.y);
    expect(wrapperConfiguration.getCorrectionSideX()).toEqual(configuration.correctionSide.x);
    expect(wrapperConfiguration.getCorrectionSideY()).toEqual(configuration.correctionSide.y);
    expect(wrapperConfiguration.getFont()).toEqual(configuration.font);
  });

  test('should be change size', () => {
    const size = {
      width: 400,
      height: 200,
    };
    const canvas = document.createElement('canvas');
    const wrapper = new Wrapper(canvas, new WrapperConfiguration(wrapperInternalConfiguration));
    wrapper.render(size);
    const ctx = wrapper.get2dContext().canvas;
    expect(ctx.width).toEqual(size.width + wrapperInternalConfiguration.correctionSide.x);
    expect(ctx.height).toEqual(size.height + wrapperInternalConfiguration.correctionSide.y);
  });
});
