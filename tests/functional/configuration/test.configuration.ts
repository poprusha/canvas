import { RectProperty } from '@app/rect/rect';
import { WrapperConfiguration } from '@app/wrapper/wrapper.configuration';
import { Mode } from '@app/configuration/configuration';

const color = '#c3c395';

export type TestConfiguration = {
  rects: {
    items: RectProperty[];
    option: {
      beginX: number;
      beginY: number;
      offset: number;
    };
  };
  board: {
    font: string;
    pierColor: string;
  };
  wrapper: WrapperConfiguration;
  root: string;
  mode: Mode;
};

export const testConfiguration = {
  rects: {
    items: [
      { x: 10, y: 10, width: 150, height: 60, color },
      { x: 10, y: 10, width: 120, height: 80, color },
      { x: 10, y: 10, width: 80, height: 50, color },
      { x: 10, y: 10, width: 100, height: 40, color },
    ],
    option: {
      beginX: 30,
      beginY: 20,
      offset: 20,
    },
  },
  board: {
    font: '13px Arial',
    pierColor: '#94A7B6',
  },
  root: '#root',
  mode: 'TEST',
};
