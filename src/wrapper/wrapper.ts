import {
  RulerNumberLabelOptions,
  WrapperConfiguration,
  WrapperInternalConfiguration,
} from '@app/wrapper/wrapper.configuration';

export type BoardDimensions = {
  width: number;
  height: number;
};

type Coordinates = {
  x: number;
  y: number;
};

export type lineCoordinates = {
  moveTo: Coordinates;
  lineTo: Coordinates;
};

export type DrawOption = {
  ctx: CanvasRenderingContext2D;
  increment: number;
  rulerStep: {
    x: number;
    y: number;
  };
  rulerNumberLabelOptions: RulerNumberLabelOptions;
  divisionsHeight: number;
};

export class Wrapper {
  constructor(private readonly wrapper: HTMLCanvasElement, private readonly configuration: WrapperConfiguration) {}

  public render(board: BoardDimensions): void {
    const ctx = this.get2dContext();

    this.updateFont(this.configuration.getFont());
    this.updateDimensions(board);

    const configuration = this.configuration.getInternalConfiguration();

    this.renderX(board, configuration);
    this.renderY(board, configuration);

    ctx.stroke();
    this.setReadyStatus();
  }

  public get2dContext(): CanvasRenderingContext2D {
    return this.wrapper.getContext('2d') as CanvasRenderingContext2D;
  }

  public updateFont(font: string): void {
    this.get2dContext().font = font;
  }

  private renderX(board: BoardDimensions, configuration: WrapperInternalConfiguration): void {
    this.renderRuler(board.width, configuration, Wrapper.renderRulerX);
  }

  private renderY(board: BoardDimensions, configuration: WrapperInternalConfiguration): void {
    this.renderRuler(board.height, configuration, Wrapper.renderRulerY);
  }

  private renderRuler(
    size: number,
    configuration: WrapperInternalConfiguration,
    call: (option: DrawOption) => void
  ): void {
    const { rulerStep, smallDivisionsHeight, largeDivisionsHeight, rulerNumberLabelOptions } = configuration;
    const ctx = this.get2dContext();

    for (let i = 0; i < size; i += 10) {
      call({
        ctx,
        increment: i,
        rulerStep: {
          x: rulerStep.x,
          y: rulerStep.y,
        },
        divisionsHeight: Wrapper.isBigDivision(i) ? largeDivisionsHeight : smallDivisionsHeight,
        rulerNumberLabelOptions,
      });
    }
  }

  private static isBigDivision(value: number): boolean {
    return Number.isInteger(value / 100);
  }

  private static renderRulerX(options: DrawOption): void {
    const { ctx, increment, rulerStep, divisionsHeight, rulerNumberLabelOptions } = options;

    Wrapper.draftStroke(ctx, {
      moveTo: { x: increment + rulerStep.x, y: rulerStep.y },
      lineTo: { x: increment + rulerStep.x, y: rulerStep.y - divisionsHeight },
    });

    Wrapper.renderLabelRuler(
      options,
      increment + rulerNumberLabelOptions.step.x + rulerNumberLabelOptions.position.startX.x,
      rulerNumberLabelOptions.position.startX.y
    );
  }

  private static renderRulerY(options: DrawOption): void {
    const { ctx, increment, rulerStep, divisionsHeight, rulerNumberLabelOptions } = options;

    Wrapper.draftStroke(ctx, {
      moveTo: { x: rulerStep.x, y: increment + rulerStep.y },
      lineTo: { x: rulerStep.y - divisionsHeight, y: rulerStep.y + increment },
    });

    Wrapper.renderLabelRuler(
      options,
      rulerNumberLabelOptions.position.startY.x,
      increment + rulerNumberLabelOptions.position.startY.y
    );
  }

  private static renderLabelRuler(options: DrawOption, x: number, y: number): void {
    const { increment } = options;

    if (!Wrapper.isBigDivision(increment)) {
      return;
    }

    Wrapper.draftLabel(options, x, y);
  }
  private static draftLabel(options: DrawOption, x: number, y: number): void {
    const { increment, ctx } = options;
    ctx.fillText((increment / 100).toString(), x, y);
  }

  private static draftStroke(ctx: CanvasRenderingContext2D, cor: lineCoordinates): void {
    ctx.moveTo(cor.moveTo.x, cor.moveTo.y);
    ctx.lineTo(cor.lineTo.x, cor.lineTo.y);
  }

  private updateDimensions(board: BoardDimensions): void {
    this.wrapper.width = this.calcWidth(board.width);
    this.wrapper.height = this.calcHeight(board.height);
  }

  private calcHeight(height: number): number {
    // return Mediator.getInnerHeight() - this.configuration.getCorrectionSideY();
    return height + this.configuration.getCorrectionSideY();
  }

  private calcWidth(width: number): number {
    // return Mediator.getInnerWidth() - this.configuration.getCorrectionSideX();
    return width + this.configuration.getCorrectionSideX();
  }
  private setReadyStatus(): void {
    this.wrapper.setAttribute('ready', 'true');
  }
}
