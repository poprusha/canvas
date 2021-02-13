import { Wrapper } from '@app/wrapper/wrapper';
import { WrapperConfiguration } from '@app/wrapper/wrapper.configuration';
import { wrapperInternalConfiguration } from '@app/wrapper/wrapper.internal.configuration';

(() => {
  const canvas = <HTMLCanvasElement | null>document.querySelector('#canvas');

  if (!canvas) {
    return;
  }

  const wrapper = new Wrapper(canvas, new WrapperConfiguration(wrapperInternalConfiguration));

  requestAnimationFrame(() => {
    wrapper.render({ width: 400, height: 400 });
  });
})();
