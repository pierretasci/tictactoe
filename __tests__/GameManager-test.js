jest.dontMock('../app/scripts/core/gamemanager');
jest.dontMock('object-assign');
jest.dontMock('keymirror');
jest.dontMock('../app/scripts/core/constants');
jest.dontMock('../app/scripts/models/board');
jest.dontMock('../app/scripts/models/move');

describe('GameStore', function() {

  var constants = require('../app/scripts/core/constants');
  var Board = require('../app/scripts/models/board');
  var GameManager = require('../app/scripts/core/gamemanager');
  var Move = require('../app/scripts/models/move');
  var Dispatcher;
  var GameStore;
  var callback;

  it('will create a new board given a move', function() {
    var H = constants.PLAYERS.HUMAN;
    var C = constants.PLAYERS.COMPUTER; 
    var initboard = [   C, null,    H,
                        C, null,    C,
                     null,    H,    H];
    var board = new Board();
    board.init(initboard);

    expect(board.getPlayerAt(1, 2)).toBe(null);

    var newMove = new Move(1, 2, H);

    var newBoard = GameManager.getNewBoardWithMove(board, newMove);

    expect(newBoard.getPlayerAt(1, 2)).toBe(H);
    expect(newBoard.getPlayerAt(2, 2)).toBe(null);
  });

  it('will return a correct score', function() {
    var H = constants.PLAYERS.HUMAN;
    var C = constants.PLAYERS.COMPUTER; 
    var initboard = [   C,    C,    H,
                        H,    C,    C,
                        H,    H,    H];
    var board = new Board();
    board.init(initboard);

    // Human won, depth 0, return a score of -1
    expect(GameManager.getScore(board, 0)).toBe(-1);
    // Human won, depth 3, return a score of 2
    expect(GameManager.getScore(board, 3)).toBe(2);
  })

  it('will go for the win', function() {
  	var H = constants.PLAYERS.HUMAN;
		var C = constants.PLAYERS.COMPUTER;	
		var initboard = [		C, null, 	 	H,
										 		C, null, 		C,
								 		 null, 		H, 		H];
		var board = new Board();
		board.init(initboard);

    var choice = GameManager.minMax(board, C);

  	expect(choice).not.toBe(null);
  	expect(choice.getRow()).toBe(3);
  	expect(choice.getCol()).toBe(1);
  });

  it('will block the human player', function() {
  	var H = constants.PLAYERS.HUMAN;
		var C = constants.PLAYERS.COMPUTER;	
		var initboard = [		C, 		C, 	 	H,
										 null, null, 		C,
								 		 		H, 		H, null];
		var board = new Board();
		board.init(initboard);

		var choice = GameManager.minMax(board, C);

  	expect(choice).not.toBe(null);
  	expect(choice.getRow()).toBe(3);
  	expect(choice.getCol()).toBe(3);
  });

  it('will pick the bottom right corner as starting move', function() {

    var choice = GameManager.minMax(new Board(), GameManager.C);

  	expect(choice).not.toBe(null);
  	expect(choice.getRow()).toBe(3);
  	expect(choice.getCol()).toBe(3);
  });

});