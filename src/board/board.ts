import { Mediator } from '@app/mediator';
import { BoardSettings } from '@app/board/board.settings';

export class Board {
  private readonly context: CanvasRenderingContext2D;

  constructor(private readonly boardCanvas: HTMLCanvasElement, private readonly configuration: BoardSettings) {
    this.context = boardCanvas.getContext('2d') as CanvasRenderingContext2D;
    this.resize();
    this.resize = this.resize.bind(this);
  }

  public getCanvas(): HTMLCanvasElement {
    return this.boardCanvas;
  }

  public resize(): void {
    this.boardCanvas.width = this.calcBoardWidth();
    this.boardCanvas.height = this.calcBoardHeight();
  }

  public clear(): void {
    this.context.clearRect(0, 0, this.boardCanvas.width, this.boardCanvas.height);
  }

  public drawPier(): void {
    this.context.fillStyle = this.configuration.getPierColor();
    this.clear();
    this.context.fillRect(0, 0, this.configuration.getSideBarWidth(), this.boardCanvas.height);
  }

  private calcBoardHeight(): number {
    return Mediator.getInnerHeight() - this.configuration.getAmendmentY();
  }

  private calcBoardWidth(): number {
    return Mediator.getInnerWidth() - this.configuration.getAmendmentX();
  }

  public setReadyStatus(): void {
    this.boardCanvas.setAttribute('ready', 'true');
  }
}
