import Dispatcher from "scripts/core/dispatcher";
import {EventEmitter} from "events";
import assign from "object-assign";
import Board from "scripts/models/board";
import constants from "scripts/core/constants";

let _board = new Board();
let _activePlayer = null;
let _nextChoice = null;

const CHANGE_EVENT = "change";

// Private functions

function getNewBoardWithMove(row, col, player) {
	var newBoard = _board.clone();
	newBoard.setPlayerAt(row, col, player);
	return newBoard;
}

function getScore(board) {
	var gameWinner = board.isGameOver();
	if(gameWinner == constants.PLAYERS.COMPUTER) {
		return 1;
	} else if(gameWinner == constants.PLAYERS.HUMAN) {
		return -1;
	} else {
		return 0;
	}
}

function minMax(board) {
	if(board.isGameOver()) {
		return getScore(board);
	}

	let scores = [];
	let moves = [];

	board.getPossibleMovesForPlayer(constants.PLAYERS.COMPUTER).map(function(move) {
		let possibleBoard = getNewBoardWithMove(move.row, move.col, move.player);
		scores.push(minMax(possibleBoard));
		moves.push(move);
	});

	if(_activePlayer == constants.PLAYERS.COMPUTER) {
		// GET THE MAX
		let maxArrayIndex = null;
		let maxScore = 0;
		scores.map(function(score, i) {
			if(score > maxScore) {
				maxArrayIndex = i;
			}
		});
		_nextChoice = moves[maxArrayIndex];
		return maxScore;
	} else {
		// GET THE MIN
		let minArrayIndex = null;
		let minScore = 0;
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
    var action = payload.action;

    return true; // No errors. Needed by promise in Dispatcher.
  })

});

export default GameStore;
