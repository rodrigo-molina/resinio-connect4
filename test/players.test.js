const Players = require('../src/domain/Players');

describe('Players', () => {
  const players = new Players();
  test('it should return players', () => {
    expect(players).not.toBe(undefined);
  });
  test('it should return players', () => {
    expect(players).not.toBe(undefined);
  });
});
