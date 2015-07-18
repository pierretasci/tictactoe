import Dispatcher from "../core/dispatcher";
import {EventEmitter} from "events";
import assign from "object-assign";
import Board from "../models/board";
import constants from "../core/constants";

let _board = null;
let _activePlayer = null;
let _nextChoice = null;

const CHANGE_EVENT = "change";

// Private functions

function getNewBoardWithMove(board, row, col, player) {
	var newBoard = board.clone();
	newBoard.setPlayerAt(row, col, player);
	return newBoard;
}

function getScore(board, depth) {
	var gameWinner = board.getGameWinner();
	if(gameWinner == constants.PLAYERS.COMPUTER) {
		return 1 - depth;
	} else if(gameWinner == constants.PLAYERS.HUMAN) {
		return depth - 1;
	} else {
		return 0;
	}
}

let logOnce = (function() {
	var executed = false;
	return function(message) {
		if(!executed) {
			executed = true;
			console.log(message);
		}
	}
})();

function minMax(board, activePlayer, depth) {
	if(board.isGameOver()) {
		return getScore(board, depth);
	}
	depth += 1;
	let scores = [];
	let moves = [];

	board.getPossibleMovesForPlayer(activePlayer).map(function(move) {
		let possibleBoard = getNewBoardWithMove(board, move.getRow(), move.getCol(), move.getPlayer());
		let newActivePlayer = (constants.PLAYERS.HUMAN == activePlayer ? constants.PLAYERS.COMPUTER : constants.PLAYERS.HUMAN);
		scores.push(minMax(possibleBoard, newActivePlayer, depth));
		moves.push(move);
	});

	if(activePlayer == constants.PLAYERS.COMPUTER) {
		// GET THE MAX
		let maxArrayIndex = 0;
		let maxScore = -100;
		scores.map(function(score, i) {
			if(score > maxScore) {
				maxArrayIndex = i;
			}
		});
		_nextChoice = moves[maxArrayIndex];
		return maxScore;
	} else {
		// GET THE MIN
		let minArrayIndex = 0;
		let minScore = 100;
		scores.map(function(score, i) {
			if(score > minScore) {
				minArrayIndex = i;
			}
		});
		_nextChoice = moves[minArrayIndex];
		return minScore;
	}
}

var GameStore = assign({}, EventEmitter.prototype, {

	startGame: function() {
		_board = new Board();
		_activePlayer = null;
		_nextChoice = null;
	},

	getBoard: function() {
		return _board;
	},

	// ONLY USED FOR TESTING
	setBoard: function(board) {
		_board = board;
	},

	getActivePlayer: function() {
		return _activePlayer;
	},

	getNextComputerMove: function() {
		return _nextChoice;
	},

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  dispatcherIndex: Dispatcher.register(function(payload) {
    var action = payload.actionType;


    switch(action) {
    	case constants.ACTIONS.CALCULATE_NEXT_MOVE:
    		_activePlayer = constants.PLAYERS.COMPUTER;
    		minMax(_board, _activePlayer, 0);
    		break;
    }

    return true; // No errors. Needed by promise in Dispatcher.
  })

});

export default GameStore;
