import { BoardSettings } from '@app/board/board.settings';

describe('Board: ', () => {
  test('config should be equal', () => {
    const configuration = {
      font: '13px Arial',
      pierColor: 'blue',
      amendmentY: 50,
      amendmentX: 45,
    };
    const boardConfiguration = new BoardSettings(configuration);

    expect(boardConfiguration.getFont()).toEqual(configuration.font);
    expect(boardConfiguration.getPierColor()).toEqual(configuration.pierColor);
    expect(boardConfiguration.getAmendmentX()).toEqual(configuration.amendmentX);
    expect(boardConfiguration.getAmendmentY()).toEqual(configuration.amendmentY);
  });
});
