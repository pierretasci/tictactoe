import constants from "./constants";

/* http://neverstopbuilding.com/minimax */
let GameManager = {
	H: constants.PLAYERS.HUMAN,
	C: constants.PLAYERS.COMPUTER,

	getNewBoardWithMove: function(board, move) {
		var newBoard = board.clone();
		newBoard.setPlayerAt(move.getRow(), move.getCol(), move.getPlayer());
		return newBoard;
	},

	getScore: function(board, depth) {
		var gameWinner = board.getGameWinner();
		if(gameWinner == GameManager.C) {
			return 10 - depth;
		} else if(gameWinner == GameManager.H) {
			return depth - 10;
		} else {
			return 0;
		}
	},

	minMax: function(board, activePlayer) {
		let _nextChoice = null;
		let _minMax = function(_board, _activePlayer, _depth) {
			if(_board.isGameOver()) {
				return GameManager.getScore(_board, _depth);
			}
			_depth += 1;
			let scores = [];
			let moves = [];

			_board.getPossibleMovesForPlayer(_activePlayer).map(function(move) {
				let possibleBoard = GameManager.getNewBoardWithMove(_board, move);
				let newActivePlayer = (GameManager.H == _activePlayer ? GameManager.C : GameManager.H);
				scores.push(_minMax(possibleBoard, newActivePlayer, _depth));
				moves.push(move);
			});

			if(_activePlayer == GameManager.C) {
				// GET THE MAX
				let maxArrayIndex = 0;
				let maxScore = scores[0];
				for(let i = 0; i < scores.length; i++) {
					let score = scores[i];
					if(score > maxScore) {
						maxScore = score;
						maxArrayIndex = i;
					}
				}
				_nextChoice = moves[maxArrayIndex];
				return maxScore;
			} else {
				// GET THE MIN
				let minArrayIndex = 0;
				let minScore = scores[0];
				for(let i = 0; i < scores.length; i++) {
					let score = scores[i];
					if(score < minScore) {
						minScore = score;
						minArrayIndex = i;
					}
				}
				_nextChoice = moves[minArrayIndex];
				return minScore;
			}
		};

		_minMax(board, activePlayer, 0);

		return _nextChoice;
	}
};

export default GameManager;
