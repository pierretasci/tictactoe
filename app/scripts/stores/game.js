import Dispatcher from "../core/dispatcher";
import {EventEmitter} from "events";
import assign from "object-assign";
import Board from "../models/board";
import constants from "../core/constants";
import GameManager from "../core/gamemanager";

let _board = null;
let _activePlayer = null;
let _nextChoice = null;

const CHANGE_EVENT = "change";

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
    		_nextChoice = GameManager.minMax(_board, _activePlayer, 0);
    		break;
    }

    return true; // No errors. Needed by promise in Dispatcher.
  })

});

export default GameStore;
