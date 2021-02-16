import { Board } from '@app/board/board';
import { Wrapper } from '@app/wrapper/wrapper';
import { Rect } from '@app/rect/rect';
import { Mediator } from '@app/mediator';

export class Manager {
  private isDrag: boolean;

  constructor(private readonly board: Board, private readonly wrapper: Wrapper, private readonly rects: Rect[]) {
    this.update = this.update.bind(this);
    this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
    this.mouseDownHandler = this.mouseDownHandler.bind(this);
    this.mouseUpHandler = this.mouseUpHandler.bind(this);
  }

  public start(): void {
    const board = this.board.getCanvas();
    Mediator.onresizeWindow(this.update);
    board.addEventListener('mousemove', this.mouseMoveHandler);
    board.addEventListener('mousedown', this.mouseDownHandler);
    board.addEventListener('mouseup', this.mouseUpHandler);

    requestAnimationFrame(() => {
      this.update();
      this.board.setReadyStatus();
    });
  }

  private update(): void {
    this.checkIntersections(this.rects);
    this.checkRectsConnections(this.rects);
    this.board.clear();
    this.board.resize();
    this.board.drawPier();
    const { width, height } = this.board.getCanvas();
    this.wrapper.render({ width, height });
    this.board.drawRects(this.rects);
  }

  private checkIntersections(rects: Rect[]): void {
    rects.forEach((rect) => rect.crossedHandler(rects));
  }

  private checkRectsConnections(rects: Rect[]): void {
    rects.forEach((rect) => rect.nearRectsHandler(rects));
  }

  private mouseMoveHandler(e: MouseEvent): void {
    this.rects.forEach((rect) => rect.mouseMoveHandler(e));
  }

  private mouseDownHandler(e: MouseEvent): void {
    if (!this.isDrag) {
      this.isDrag = true;
      this.rects.find((rect) => rect.mouseDragHandler(e));
    }

    this.run();
  }

  private mouseUpHandler(): void {
    if (this.isDrag) {
      this.isDrag = false;
      this.rects.forEach((rect: Rect) => rect.mouseDropHandler());
    }
  }

  private run(): void {
    if (!this.isDrag) {
      return;
    }

    requestAnimationFrame(() => {
      this.update();
      this.run();
    });
  }
}
