jest.dontMock('object-assign');
jest.dontMock('keymirror');
jest.dontMock('../app/scripts/stores/game');
jest.dontMock('../app/scripts/core/constants');
jest.dontMock('../app/scripts/core/gamemanager');
jest.dontMock('../app/scripts/models/board');
jest.dontMock('../app/scripts/models/move');

describe('GameStore', function() {
  var constants = require('../app/scripts/core/constants');
  var Board = require('../app/scripts/models/board');
  var GameManager = require('../app/scripts/core/gamemanager');
  var Dispatcher;
  var GameStore;
  var callback;
  var initialTime = 0;

  // mock actions
  var actionStartGame = function(initialPlayer) {
  	return {
  		actionType: constants.ACTIONS.START_GAME,
  		initialPlayer: initialPlayer
  	};
  };

  var actionEnactPlayerMove = function(row, col, player) {
  	return {
  		actionType: constants.ACTIONS.ENACT_PLAYER_MOVE,
	  	playerMove: {
	  		row: row,
	  		col: col,
	  		player: player
	  	}
	  };
  };

  beforeEach(function() {
    Dispatcher = require('../app/scripts/core/dispatcher');
    GameStore = require('../app/scripts/stores/game');
    callback = Dispatcher.register.mock.calls[0][0];
  });

  it('registers a callback with the dispatcher', function() {
    expect(Dispatcher.register.mock.calls.length).toBe(1);
  });

  it('sets up a basic tic tac toe board, human first', function() {
  	callback(actionStartGame(GameManager.H));
  	
  	expect(GameStore.getBoard()).not.toBe(null);
  	expect(GameStore.getActivePlayer()).toBe(GameManager.H);
  	expect(GameStore.getBoard().getAvailableSpaces()).toBe(9);
  });

  it('sets up a basic tic tac toe board, computer first', function() {
  	callback(actionStartGame(GameManager.C));

  	expect(GameStore.getBoard()).not.toBe(null);
  	expect(GameStore.getActivePlayer()).toBe(GameManager.H);
  	expect(GameStore.getBoard().getAvailableSpaces()).toBe(8);
  });

  it('runs through an easy game', function() {
  	callback(actionStartGame(GameManager.H));
  	callback(actionEnactPlayerMove(1, 1, GameManager.H));

  	expect(GameStore.getActivePlayer()).toBe(GameManager.H);
  	expect(GameStore.getBoard().getPlayerAt(1, 1)).toBe(GameManager.H);
  	expect(GameStore.getBoard().getPlayerAt(2, 2)).toBe(GameManager.C);

  	// Now make a move that will force the computer to block
  	callback(actionEnactPlayerMove(1, 2, GameManager.H));

  	expect(GameStore.getActivePlayer()).toBe(GameManager.H);
  	expect(GameStore.getBoard().getPlayerAt(1, 3)).toBe(GameManager.C);
  	expect(GameStore.getBoard().getPlayerAt(1, 2)).toBe(GameManager.H);

  	// Human must now block 3, 1
  	callback(actionEnactPlayerMove(3, 1, GameManager.H));

  	expect(GameStore.getActivePlayer()).toBe(GameManager.H);
  	expect(GameStore.getBoard().getPlayerAt(3, 1)).toBe(GameManager.H);
  	expect(GameStore.getBoard().getPlayerAt(2, 1)).toBe(GameManager.C);

  	// Human will leave win open
  	callback(actionEnactPlayerMove(3, 3, GameManager.H));
		expect(GameStore.getActivePlayer()).toBe(GameManager.H);
  	expect(GameStore.getBoard().getPlayerAt(3, 3)).toBe(GameManager.H);
  	expect(GameStore.getBoard().getPlayerAt(2, 3)).toBe(GameManager.C);  	
  	expect(GameStore.getBoard().isGameOver()).toBe(true);
  	expect(GameStore.getBoard().getGameWinner()).toBe(GameManager.C);
  });
});