import { boardInternalConfiguration } from '@app/board/board.internal.configuration';

export type BoardProps = {
  font: string;
  pierColor: string;
};

export type BoardConfiguration = {
  amendmentY: number;
  amendmentX: number;
  sideBarWidth: number;
} & BoardProps;

export class BoardSettings {
  private readonly configuration: BoardConfiguration;

  constructor(options: BoardProps) {
    this.configuration = BoardSettings.mergeConfiguration(options);
  }

  private static mergeConfiguration(options: BoardProps): BoardConfiguration {
    return { ...options, ...boardInternalConfiguration };
  }

  public getAmendmentY(): number {
    return this.configuration.amendmentY;
  }

  public getAmendmentX(): number {
    return this.configuration.amendmentX;
  }

  public getPierColor(): string {
    return this.configuration.pierColor;
  }

  public getFont(): string {
    return this.configuration.font;
  }

  public getSideBarWidth(): number {
    return this.configuration.sideBarWidth;
  }
}
