const red = [255, 0, 0];
const blue = [0, 0, 255];

class Player {
  constructor(colour, name) {
    this.colour = colour;
    this.name = name;
  }
}

module.exports = class Players {
  constructor() {
    this._currentPlayer = 0;
    this.players = [new Player(red, 'Red'), new Player(blue, 'Blue')];
  }
  get currentPlayer() {
    return this.players[this._currentPlayer];
  }
  nextPlayer() {
    this._currentPlayer = (this._currentPlayer + 1) % this.players.length;
    return this.players[this._currentPlayer];
  }
};