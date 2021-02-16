import { DefaultConfiguration, RectDefaultConfiguration } from '@app/rect/rect.default.configuration';

type Coordinates = {
  x: number;
  y: number;
};

export type RectProperty = {
  width: number;
  height: number;
  color?: string;
  normalColor?: string;
  lineWidth?: number;
  strokeStyle?: string;
};

export type RenderOptions = {
  x: number;
  y: number;
  initialPosition: Coordinates;
  color: string;
  lineWidth: number;
  strokeStyle: string;
} & Pick<RectProperty, 'width' | 'height'>;

type CrossedCoordinate = {
  x: number;
  y: number;
  dx: number;
  dy: number;
};

export class Rect {
  private readonly strokeStyle: string;
  private readonly lineWidth: number;
  private readonly height: number;
  private readonly width: number;
  private readonly normalColor: string;
  private readonly sideWidth: number;
  private readonly initialPosition: Coordinates;
  private readonly startPosition: Coordinates;
  private x: number;
  private y: number;
  private color: string;
  private drag: boolean;
  private collision: boolean;
  private readonly configuration: DefaultConfiguration;

  constructor(option: RectProperty) {
    this.configuration = RectDefaultConfiguration;
    this.height = option.height;
    this.width = option.width;
    this.color = option.color ?? this.configuration.color;
    this.normalColor = this.color;
    this.drag = false;
    this.collision = false;
    this.initialPosition = { x: 0, y: 0 };
    this.startPosition = { x: 0, y: 0 };
    this.sideWidth = this.configuration.sideWidth;
    this.strokeStyle = option.strokeStyle ?? this.configuration.strokeStyle;
    this.lineWidth = option.lineWidth ?? this.configuration.lineWidth;
  }

  public getX(): number {
    return this.x;
  }

  public setX(value: number): void {
    this.x = value;
  }

  public getY(): number {
    return this.y;
  }

  public setY(value: number): void {
    this.y = value;
  }

  public getInitialX(): number {
    return this.initialPosition.x;
  }

  public setInitialX(value: number): void {
    this.initialPosition.x = value;
  }

  public getInitialY(): number {
    return this.initialPosition.y;
  }

  public setInitialY(value: number): void {
    this.initialPosition.y = value;
  }

  public getHeight(): number {
    return this.height;
  }

  public getWidth(): number {
    return this.width;
  }

  public getDy(): number {
    return this.y + this.height;
  }

  public setDy(value: number): void {
    this.y = value - this.height;
  }

  public getDx(): number {
    return this.x + this.width;
  }

  public getColor(): string {
    return this.color;
  }

  public setDx(value: number): void {
    this.x = value - this.width;
  }

  public isCollided(): boolean {
    return this.collision;
  }

  public getRenderOptions(): RenderOptions {
    const { color, lineWidth, strokeStyle, x, y, initialPosition, height, width } = this;

    return {
      color,
      lineWidth,
      strokeStyle,
      x,
      y,
      initialPosition,
      height,
      width,
    };
  }

  public nearRectsHandler(rects: Rect[]): void {
    if (!this.drag) {
      return;
    }

    const nearRect = rects.find((rect: Rect) => this.isNear(rect));

    if (nearRect) {
      this.setPositionToRectEdge(nearRect);
    }
  }

  public crossedHandler(rects: Rect[]): void {
    if (rects.some((rect: Rect) => this.isCrossed(rect))) {
      this.collision = true;
      this.color = this.configuration.collusionRectColor;

      return;
    }

    this.collision = false;
    this.color = this.normalColor;
  }

  public mouseDragHandler(e: MouseEvent): boolean {
    const clientX = e.clientX - this.configuration.mouseAmendmentX;
    const clientY = e.clientY - this.configuration.mouseAmendmentY;

    if (!this.isNearToAnotherRect(clientX, clientY)) {
      return false;
    }

    this.startPosition.x = this.x;
    this.startPosition.y = this.y;
    this.drag = true;
    this.centeringToDot(clientX, clientY);

    return true;
  }

  public mouseDropHandler(): void {
    if (!this.drag) {
      return;
    }

    if (this.x <= this.sideWidth) {
      this.updateCoordinates(this.initialPosition);
    }

    if (this.collision) {
      this.updateCoordinates(this.startPosition);
    }

    this.drag = false;
  }

  public mouseMoveHandler(e: MouseEvent): void {
    if (!this.drag) {
      return;
    }

    this.centeringToDot(e.clientX - this.configuration.mouseAmendmentX, e.clientY - this.configuration.mouseAmendmentY);
  }

  private isCrossed(rect: Rect): boolean {
    if (rect === this) {
      return false;
    }

    return Rect.isCrossed(
      {
        x: this.x,
        y: this.y,
        dx: this.getDx(),
        dy: this.getDy(),
      },
      rect
    );
  }

  private static isCrossed(rectCoordinate: CrossedCoordinate, rect: Rect): boolean {
    return !(
      rectCoordinate.y >= rect.getDy() ||
      rectCoordinate.dy <= rect.y ||
      rectCoordinate.dx <= rect.x ||
      rectCoordinate.x >= rect.getDx()
    );
  }

  private isNearToAnotherRect(x: number, y: number, hitRange: number = this.configuration.mouseClickHitRange): boolean {
    return Rect.isCrossed(
      {
        x: x - hitRange,
        y: y - hitRange,
        dx: x + hitRange,
        dy: y + hitRange,
      },
      this
    );
  }

  private setPositionToRectEdge(rect: Rect): void {
    if (this.getDy() < rect.y) {
      this.setDy(rect.y);

      return;
    }

    if (this.y > rect.getDy()) {
      this.y = rect.getDy();

      return;
    }

    if (this.getDx() < rect.x) {
      this.setDx(rect.x);
    }

    if (this.x > rect.getDx()) {
      this.x = rect.getDx();
    }
  }

  private isNear(rect: Rect): boolean {
    if (rect === this) {
      return false;
    }

    return Rect.isCrossed(this.getBiggerRect(), rect);
  }

  private getBiggerRect(rate: number = this.configuration.mouseClickHitRange): CrossedCoordinate {
    return {
      x: this.x - rate,
      y: this.y - rate,
      dx: this.getDx() + rate,
      dy: this.getDy() + rate,
    };
  }

  private centeringToDot(x: number, y: number): void {
    this.updateCoordinates({ x: x - this.width / 2, y: y - this.height / 2 });
  }

  private updateCoordinates(coordinates: Coordinates): void {
    this.setX(coordinates.x);
    this.setY(coordinates.y);
  }
}
