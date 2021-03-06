import { Mediator } from '@app/mediator';
import { BoardSettings } from '@app/board/board.settings';
import { WrapperConfiguration } from '@app/wrapper/wrapper.configuration';
import { BoardDefaultConfiguration } from '@app/board/board.default.configuration';
import { wrapperInternalConfiguration } from '@app/wrapper/wrapper.internal.configuration';
import { Rect } from '@app/rect/rect';
import { RectsFixtures } from '@app/fixtures/rects.fixtures';
import { RectDefaultConfiguration } from '@app/rect/rect.default.configuration';
import { ConfigurationValidator } from '@app/configuration/configuration.validator';
import { RectTransformer } from '@app/rect/rect.transformer';
import { DefaultConfiguration } from '@app/configuration/default.configuration';

export enum Mode {
  TEST = 'TEST',
}

export type RectConfigurationOptions = {
  beginX: number;
  beginY: number;
  offset: number;
};

export type DroppableConfiguration = {
  board: BoardSettings;
  wrapper: WrapperConfiguration;
  rects: {
    items: Rect[];
    option: RectConfigurationOptions;
  };
  root: string;
  mode?: Mode;
};

export class Configuration {
  constructor(private readonly configuration: DroppableConfiguration) {}

  public static load(): Configuration {
    return new Configuration(Mediator.isTestMode() ? Configuration.loadTest() : Configuration.loadDefault());
  }

  private static loadDefault(): DroppableConfiguration {
    return {
      rects: {
        items: RectsFixtures.load(),
        option: RectDefaultConfiguration.option,
      },
      board: new BoardSettings(BoardDefaultConfiguration),
      wrapper: new WrapperConfiguration(wrapperInternalConfiguration),
      root: DefaultConfiguration.root,
    };
  }

  public getRects(): Rect[] {
    return this.configuration.rects.items;
  }

  public getRectsOption(): RectConfigurationOptions {
    return this.configuration.rects.option;
  }

  private static loadTest(): DroppableConfiguration {
    const testConfiguration = Mediator.getTestConfiguration();
    const errors = ConfigurationValidator.validate(testConfiguration);
    const {
      board: { font, pierColor },
      root,
    } = testConfiguration;

    if (errors.length) {
      throw { errors };
    }

    return {
      wrapper: new WrapperConfiguration(wrapperInternalConfiguration),
      root,
      board: new BoardSettings({ font, pierColor }),
      rects: {
        items: RectTransformer.transform(testConfiguration.rects.items),
        option: RectDefaultConfiguration.option,
      },
      mode: Mode.TEST,
    };
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
}
