const senseJoystick = require('sense-joystick');
const senseLeds = require('sense-hat-led');
const lodash = require('lodash');
const Count4Game = require('./domain/Count4Game');

const tickDelayStart = 50;
var tickDelay = tickDelayStart;

var nextDirection;
var pixelBuffer;

let count4Game = new Count4Game();

const drawPlayer = () => {
	pixelBuffer[count4Game.getPlayerPositionIndex()] = count4Game.players.currentPlayer.colour;
}

const drawGame = () => {
	pixelBuffer = lodash.clone(count4Game.board);
};

// Setup input callbacks
senseJoystick.getJoystick()
.then((joystick) => {
	joystick.on('press', (val) => {
		if (val === 'click') {
			restartGame();
		} else {
			unpauseGame()
			let currentDir = lodash.last(nextDirection) || 'none';
			if (val !== currentDir) {
				nextDirection.push(val);
			}
		}
	});
});


const tick = () => {
	let direction = nextDirection.shift() || 'none';
	switch(direction) {
		case 'left':
		case 'right':
			count4Game.movePlayer(direction);
			break;
		case 'down':
			count4Game.insertMove();
			count4Game.isGameFinished() ? gameEnds() : count4Game.changePlayer();
		case 'stop':
		case 'none':
		default:
	};
	
	drawGame();
	drawPlayer();
	senseLeds.setPixels(pixelBuffer);
};

const restartGame = () => {
	stopGameLoop();
	nextDirection = [];
	tickDelay = tickDelayStart;
	count4Game = new Count4Game();
	setTimeout(() => {
		senseLeds.clear([255, 255, 153]);
		setTimeout(() => {
			startGameLoop();
		}, 1000);
	});

};

const gameEnds = () => {
	stopGameLoop();
	setTimeout(() => {
		senseLeds.showMessage(
			`${count4Game.players.currentPlayer.name} wins!`, () => { setTimeout(restartGame, 500);});
	});
}

let timerHandle;
const STOPPED = 0;
const PAUSED = 1;
const RUNNING = 2;
let state = STOPPED;
const pauseGame = () => {
	if (state === STOPPED) return;
	state = PAUSED;
	clearInterval(timerHandle);
}
const unpauseGame = () => {
	if (state === PAUSED) {
		startGameLoop();
	}
}
const startGameLoop = () => {
	clearInterval(timerHandle);
	timerHandle = setInterval(tick, tickDelay);
	state = RUNNING;
}
const stopGameLoop = () => {
	state = STOPPED;
	clearInterval(timerHandle);
}

restartGame();
