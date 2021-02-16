import { RenderOptions } from '@app/rect/rect';

export type DefaultConfiguration = {
  mouseClickHitRange: number;
  connectingRectSize: number;
  mouseAmendmentX: number;
  mouseAmendmentY: number;
  sideWidth: number;
  collusionRectColor: string;
  option: {
    beginX: number;
    beginY: number;
    offset: number;
  };
} & Pick<RenderOptions, 'color' | 'lineWidth' | 'strokeStyle'>;

export const RectDefaultConfiguration = {
  mouseClickHitRange: 20,
  connectingRectSize: 10,
  mouseAmendmentX: 8,
  mouseAmendmentY: 8,
  sideWidth: 230,
  collusionRectColor: 'red',
  color: 'green',
  lineWidth: 2,
  strokeStyle: 'black',
  option: {
    beginX: 30,
    beginY: 20,
    offset: 20,
  },
};
