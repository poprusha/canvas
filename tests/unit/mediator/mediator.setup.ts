import { mockProperties } from './mediator.mock.data';

export function setup(): void {
  for (const propertyName in mockProperties) {
    Object.defineProperty(window, propertyName, {
      configurable: true,
      value: mockProperties[propertyName],
      writable: false,
    });
  }
}
