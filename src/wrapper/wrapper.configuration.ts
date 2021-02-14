type Coordinates = {
  y: number;
  x: number;
};

export type RulerNumberLabelOptions = {
  step: Coordinates;
  position: {
    startX: Coordinates;
    startY: Coordinates;
  };
};

export type WrapperInternalConfiguration = {
  largeDivisionsHeight: number;
  smallDivisionsHeight: number;
  // step between strokes on the ruler[1╻<-->╻<-->╻2╻<-->╻<-->╻3]
  rulerStep: Coordinates;
  // step between labels on the ruler[1__<-->__2__<-->__3]
  rulerNumberLabelOptions: RulerNumberLabelOptions;
  // padding for wrapper
  correctionSide: Coordinates;
  //small ruler step
  smallRulerStep: number;
  //big ruler step
  bigRulerStep: number;
  //font for label
  font: string;
};

export class WrapperConfiguration {
  constructor(private readonly configuration: WrapperInternalConfiguration) {}

  public getLargeDivisionsHeight(): number {
    return this.configuration.largeDivisionsHeight;
  }

  public getSmallDivisionsHeight(): number {
    return this.configuration.smallDivisionsHeight;
  }

  public getInternalConfiguration(): WrapperInternalConfiguration {
    return this.configuration;
  }

  public getFont(): string {
    return this.configuration.font;
  }

  public getCorrectionSideY(): number {
    return this.configuration.correctionSide.y;
  }

  public getCorrectionSideX(): number {
    return this.configuration.correctionSide.x;
  }

  public getRulerStepX(): number {
    return this.configuration.rulerStep.x;
  }

  public getRulerStepY(): number {
    return this.configuration.rulerStep.y;
  }

  public getRulerLabelStepX(): number {
    return this.configuration.rulerNumberLabelOptions.step.x;
  }

  public getRulerLabelStepY(): number {
    return this.configuration.rulerNumberLabelOptions.step.y;
  }

  public getSmallRulerStep(): number {
    return this.configuration.smallRulerStep;
  }

  public getBigRulerStep(): number {
    return this.configuration.bigRulerStep;
  }
}
