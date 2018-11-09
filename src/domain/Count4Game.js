const Players = require('./Players');
const board = require('./board');

const WIDTH = 8;
const HEIGHT = 8;

const positionToIdx = ([ x, y ]) => {
  if (x < 0 || x >= WIDTH) {
    throw new Error(`x is out of bounds: ${x}`);
  }
  if (y < 0 || y >= HEIGHT) {
    throw new Error(`y is out of bounds: ${y}`);
  }
  return x + WIDTH * y;
};

module.exports = class Count4Game {
  constructor() {
    this.players = new Players();
    this.board = board.getNewBoard();
    this.currentPlayerPosition = [0, 0];
    this.lastInsertPosition = [0, 0];
  }

  changePlayer() {
    this.players.nextPlayer();
  }

  movePlayer(direction) {
    const pos = this.currentPlayerPosition;
    switch(direction) {
    case 'left':
      this.currentPlayerPosition = [Math.max(pos[0] - 1, 0), pos[1]]; 
      break;
    case 'right':
      this.currentPlayerPosition = [Math.min(pos[0] + 1, WIDTH -1), pos[1]]; 
      break;         
    }
    return this.currentPlayerPosition;
  }

  getPlayerPositionIndex() {
    return positionToIdx(this.currentPlayerPosition);
  }

  insertMove() {
    let column = this.currentPlayerPosition[0];
    for (let i = 7; i > 1; --i) {
      let index = positionToIdx([column, i]);
      if (this.board[index] == board.empty) {
        this.board[index] = this.players.currentPlayer.colour;
        this.lastInsertPosition = [column, i];
        break;
      }
    }
  }

  isGameFinished() {
    let column = this.lastInsertPosition[0];
    let count = 0;
    for (let i = 7; i > 1 && count < 4; --i) {
      if (this.board[positionToIdx([column, i])] === this.players.currentPlayer.colour) {
        count++;
      } else {
        count = 0;
      }
    }
    
    if (count === 4) return true;
    
    let row = this.lastInsertPosition[1];
    count = 0;
    for (let i = 0; i < 8 && count < 4; ++i) {
      if (this.board[positionToIdx([i, row])] === this.players.currentPlayer.colour) {
        count++;
      } else {
        count = 0;
      }
    }
    
    return count === 4;
  }

};