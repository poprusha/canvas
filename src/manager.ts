import { Board } from '@app/board/board';
import { Wrapper } from '@app/wrapper/wrapper';
import { Mediator } from '@app/mediator';

export class Manager {
  constructor(private readonly board: Board, private readonly wrapper: Wrapper) {
    this.update = this.update.bind(this);
  }

  public start(): void {
    Mediator.onresizeWindow(this.update);

    requestAnimationFrame(() => {
      this.update();
      this.board.setReadyStatus();
    });
  }

  private update(): void {
    this.board.clear();
    this.board.resize();
    this.board.drawPier();
    const { width, height } = this.board.getCanvas();
    this.wrapper.render({ width, height });
  }
}
