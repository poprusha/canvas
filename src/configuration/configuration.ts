import { Mediator } from '@app/mediator';
// import { ConfigurationValidator } from '@app/configuration/configuration.validator';
import { BoardSettings } from '@app/board/board.settings';
import { WrapperConfiguration } from '@app/wrapper/wrapper.configuration';
import { BoardDefaultConfiguration } from '@app/board/board.default.configuration';
import { wrapperInternalConfiguration } from '@app/wrapper/wrapper.internal.configuration';

export enum Mode {
  DEV = 'dev',
  TEST = 'test',
}

export type DroppableConfiguration = {
  board: BoardSettings;
  wrapper: WrapperConfiguration;
  root: string;
  mode: Mode;
};

export class Configuration {
  constructor(private readonly configuration: DroppableConfiguration) {}

  public static load(): Configuration {
    return new Configuration(Mediator.isTestMode() ? Configuration.loadTest() : Configuration.loadDefault());
  }

  private static loadDefault(): DroppableConfiguration {
    return {
      board: new BoardSettings(BoardDefaultConfiguration),
      wrapper: new WrapperConfiguration(wrapperInternalConfiguration),
      root: BoardDefaultConfiguration.root,
      mode: Mode.DEV,
    };
  }

  private static loadTest(): DroppableConfiguration {
    console.log('LOAD TEST CONFIGURATION');
    const testConfiguration = Mediator.getTestConfiguration();

    return testConfiguration;
  }

  public getBoardSettings(): BoardSettings {
    return this.configuration.board;
  }

  public getWrapperConfiguration(): WrapperConfiguration {
    return this.configuration.wrapper;
  }

  public getRoot(): string {
    return this.configuration.root;
  }

  public getMode(): Mode {
    return this.configuration.mode;
  }
}
