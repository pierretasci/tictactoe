jest.dontMock('../app/scripts/stores/game');
jest.dontMock('object-assign');
jest.dontMock('keymirror');
jest.dontMock('../app/scripts/core/constants');
jest.dontMock('../app/scripts/models/board');
jest.dontMock('../app/scripts/models/move');

describe('GameStore', function() {

  var constants = require('../app/scripts/core/constants');
  var Board = require('../app/scripts/models/board');
  var Dispatcher;
  var GameStore;
  var callback;

  // mock actions
  var actionCalcNextMove = {
  	actionType: constants.ACTIONS.CALCULATE_NEXT_MOVE
  };

  beforeEach(function() {
    Dispatcher = require('../app/scripts/core/dispatcher');
    GameStore = require('../app/scripts/stores/game');
    callback = Dispatcher.register.mock.calls[0][0];
  });

  it('registers a callback with the dispatcher', function() {
    expect(Dispatcher.register.mock.calls.length).toBe(1);
  });

  it('sets up a basic tic tac toe board', function() {
  	GameStore.startGame();
  	expect(GameStore.getBoard()).not.toBe(null);
  	expect(GameStore.getActivePlayer()).toBe(null);
  	expect(GameStore.getBoard().getAvailableSpaces()).toBe(9);
  });

  it('will go for the win', function() {
  	GameStore.startGame();
  	var H = constants.PLAYERS.HUMAN;
		var C = constants.PLAYERS.COMPUTER;	
		var initboard = [		C, null, 	 	H,
										 		C, null, 		C,
								 		 null, 		H, 		H];
		var board = new Board();
		board.init(initboard);

		GameStore.setBoard(board);

  	callback(actionCalcNextMove);
  	expect(GameStore.getNextComputerMove()).not.toBe(null);
  	expect(GameStore.getNextComputerMove().getRow()).toBe(3);
  	expect(GameStore.getNextComputerMove().getCol()).toBe(1);
  });

  it('will block the human player', function() {
  	GameStore.startGame();
  	var H = constants.PLAYERS.HUMAN;
		var C = constants.PLAYERS.COMPUTER;	
		var initboard = [		C, 		C, 	 	H,
										 null, null, 		C,
								 		 		H, 		H, null];
		var board = new Board();
		board.init(initboard);

		GameStore.setBoard(board);

  	callback(actionCalcNextMove);
  	expect(GameStore.getNextComputerMove()).not.toBe(null);
  	expect(GameStore.getNextComputerMove().getRow()).toBe(3);
  	expect(GameStore.getNextComputerMove().getCol()).toBe(3);
  });

  it('will pick the bottom right corner as starting move', function() {
  	GameStore.startGame();
  	callback(actionCalcNextMove);

  	expect(GameStore.getNextComputerMove()).not.toBe(null);
  	expect(GameStore.getNextComputerMove().getRow()).toBe(3);
  	expect(GameStore.getNextComputerMove().getCol()).toBe(3);
  });

});