jest.dontMock('../app/scripts/models/board');
jest.dontMock('../app/scripts/core/constants');
jest.dontMock('keymirror');
jest.dontMock('../app/scripts/models/move');

describe("Board", function() {
	var Board = require('../app/scripts/models/board');
	var constants = require('../app/scripts/core/constants');

	it('starts up correctly', function() {
		var board = new Board();
		expect(board.getAvailableSpaces()).toBe(9);
		expect(board.isGameOver()).toBe(false);
	});

	it('sets a player correctly', function() {
		var board = new Board();
		board.setPlayerAt(1, 1, constants.PLAYERS.HUMAN);
		expect(board.getPlayerAt(1, 1)).toBe(constants.PLAYERS.HUMAN);

		// Try to overwrite this and make sure it isn't
		board.setPlayerAt(1, 1, constants.PLAYERS.COMPUTER);
		expect(board.getPlayerAt(1, 1)).toBe(constants.PLAYERS.HUMAN);
	});

	it('initializes a board correctly', function() {
		var H = constants.PLAYERS.HUMAN;
		var C = constants.PLAYERS.COMPUTER;
		var initboard = [null, 		C, 	 	H,
								 				H, 		C, null,
								 		 null, null, null];
		var board = new Board();
		board.init(initboard);

		expect(board.getAvailableSpaces()).toBe(5);
		expect(board.getPlayerAt(1, 1)).toBe(null);
		expect(board.getPlayerAt(1, 2)).toBe(C);
		expect(board.getPlayerAt(2, 1)).toBe(H);
	});

	it('calculates possible moves correctly', function() {
		var H = constants.PLAYERS.HUMAN;
		var C = constants.PLAYERS.COMPUTER;
		var initboard = [		C,		C, 	 	H,
								 				C, 		C, 		H,
								 		 		H, 		H, null];
		var board = new Board();
		board.init(initboard);
		var possibleMoves = board.getPossibleMovesForPlayer(C);

		expect(possibleMoves.length).toBe(1);
		expect(possibleMoves[0].getRow()).toBe(3);
		expect(possibleMoves[0].getCol()).toBe(3);
		expect(possibleMoves[0].getPlayer()).toBe(C);
	});

	it('is a cat\'s game', function() {
		var H = constants.PLAYERS.HUMAN;
		var C = constants.PLAYERS.COMPUTER;
		var initboard = [		C,		C, 	 	H,
								 				H, 		H, 		C,
								 		 		C, 		H, 		C];
		var board = new Board();
		board.init(initboard);

		expect(board.isGameOver()).toBe(true);
		expect(board.getGameWinner()).toBe(constants.PLAYERS.NOONE);
	});

	it('has a winner', function() {
		var H = constants.PLAYERS.HUMAN;
		var C = constants.PLAYERS.COMPUTER;
		var initboard = [		H, null, null,
								 				H, null, null,
								 		 		H, null, null];
		var board = new Board();
		board.init(initboard);

		expect(board.isGameOver()).toBe(true);
		expect(board.getGameWinner()).toBe(H);
	})
})