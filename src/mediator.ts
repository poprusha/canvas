import { Mode } from '@app/configuration/configuration';
import { TestConfiguration } from '../tests/functional/configuration/test.configuration';

export class Mediator {
  public static getInnerHeight(): number {
    return window.innerHeight;
  }

  public static getInnerWidth(): number {
    return window.innerWidth;
  }

  public static onresizeWindow(callable: (this: GlobalEventHandlers, ev: UIEvent) => any): void {
    window.onresize = callable;
  }

  public static addDOMContentLoadedListener(listener: EventListenerOrEventListenerObject): void {
    window.addEventListener('DOMContentLoaded', listener);
  }

  public static isTestMode(): boolean {
    return window.APP_TEST_CONFIGURATION?.mode === Mode.TEST;
  }

  public static getTestConfiguration(): TestConfiguration {
    return window.APP_TEST_CONFIGURATION;
  }
}
