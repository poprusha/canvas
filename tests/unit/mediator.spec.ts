describe('Mediator: ', () => {
  test('should be return correct values', () => {
    window = Object.assign(window, { innerWidth: 500 });
    window = Object.assign(window, { innerHeight: 300 });
    expect(window.innerWidth).toEqual(500);
    expect(window.innerHeight).toEqual(300);
  });
});
