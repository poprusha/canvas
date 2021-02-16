import { Mode } from '@app/configuration/configuration';

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
    return window['APP_MODE'] === Mode.TEST;
  }

  public static getTestConfiguration(): any {
    return window['APP_TEST_CONFIGURATION'];
  }
}
