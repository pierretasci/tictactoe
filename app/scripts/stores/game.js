import Dispatcher from "../core/dispatcher";
import {EventEmitter} from "events";
import assign from "object-assign";
import Board from "../models/board";
import constants from "../core/constants";
import GameManager from "../core/gamemanager";
import Move from "../models/move";

let _board = null;
let _activePlayer = null;
let _nextChoice = null;

const CHANGE_EVENT = "change";

var GameStore = assign({}, EventEmitter.prototype, {
	startGame: function(initialPlayer) {
		_board = new Board();
		_activePlayer = initialPlayer;
		_nextChoice = null;

		// Board changed, emit
		GameStore.emitChange();

		// If the computer has the first choice, calculate its first move
		if(initialPlayer == GameManager.C) {
			GameStore.calculateComputerMove();
		}
	},

	getBoard: function() {
		return _board;
	},

	getActivePlayer: function() {
		return _activePlayer;
	},

	getNextComputerMove: function() {
		return _nextChoice;
	},

	calculateComputerMove: function() {
		// Calculate our next computer move
		_nextChoice = GameManager.minMax(_board, GameManager.C);

		// Apply this move to the board
		_board = GameManager.getNewBoardWithMove(_board, _nextChoice);
		if(_board.isGameOver()) {
			_activePlayer = null;
		} else {
			_activePlayer = GameManager.H;
		}
		GameStore.emitChange();
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
    	case constants.ACTIONS.START_GAME:
    		GameStore.startGame(payload.initialPlayer);
    		break;
    	case constants.ACTIONS.ENACT_PLAYER_MOVE:
    		_activePlayer = GameManager.C;
    		let playerMove = payload.playerMove;
    		_board = GameManager.getNewBoardWithMove(_board,
    			new Move(playerMove.row, playerMove.col, playerMove.player));

    		if(_board.isGameOver()) {
    			_activePlayer = null;
    		} else {
    			GameStore.calculateComputerMove();
    		}

    		GameStore.emitChange();

    		break;
    }

    return true; // No errors. Needed by promise in Dispatcher.
  })

});

export default GameStore;
