import { Mediator } from '@app/mediator';
import { mockProperties } from './mediator.mock.data';
import { setup } from './mediator.setup';

beforeAll(() => {
  setup();
});

describe('Mediator: ', () => {
  test('config should be equal', () => {
    expect(Mediator.getInnerHeight()).toEqual(mockProperties.innerHeight);
    expect(Mediator.getInnerWidth()).toEqual(mockProperties.innerWidth);
  });
});
