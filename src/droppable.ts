import { Board } from '@app/board/board';
import { Manager } from '@app/manager';
import { Wrapper } from '@app/wrapper/wrapper';
import { NodeCreator } from '@app/node.creator';
import { Configuration } from '@app/configuration/configuration';
import { Mediator } from '@app/mediator';

export class Droppable {
  private readonly configuration: Configuration;

  constructor(configuration?: Configuration) {
    this.init();
    this.configuration = configuration ?? Configuration.load();
  }

  private init(): void {
    Mediator.addEventListener('DOMContentLoaded', () => this.listener());
  }

  private listener(): void {
    this.bootstrap();
  }

  private bootstrap(): void {
    const nodeList = NodeCreator.create(this.configuration.getRoot());

    const wrapper = new Wrapper(nodeList.wrapper, this.configuration.getWrapperConfiguration());
    const board = new Board(nodeList.board, this.configuration.getBoardSettings());

    new Manager(board, wrapper).start();
  }
}
