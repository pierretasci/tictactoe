import constants from "scripts/core/constants";
import Move from "scripts/models/move";

export default class Board {
	constructor() {
		this.board = [];
	}

	clone() {
		var retVal = new Board();
		retVal.init(this.board.slice(0));
		return retVal;
	}

	init(initialBoard) {
		this.board = initialBoard;
	}

	getPlayerAt(row, col) {
  	return this.board[(row - 1) * 3 + (col - 1)];
  }

  setPlayerAt(row, col, player) {
  	this.board[(row - 1) * 3 + (col - 1)] = player;
  }

  getPossibleMovesForPlayer(player) {
  	var moves = this.board.map(function(curPlayer, index) {
  		var row = Math.floor(index / 3) + 1;
  		var col = index % 3 + 1;
  		return curPlayer == null ? new Move(row, col, player) : null;
  	}).filter(function(item) {
  		return item != null;
  	});
  }

  isGameOver() {
  	if(this.getPlayerAt(1,1) == this.getPlayerAt(1,2) &&					// X X X
  		this.getPlayerAt(1,2) == this.getPlayerAt(1,3)) {						// _ _ _
  		return this.getPlayerAt(1,1);																// _ _ _
  	} else if(this.getPlayerAt(1,1) == this.getPlayerAt(2,1) &&						// X _ _
  		this.getPlayerAt(2,1) == this.getPlayerAt(3,1)) {										// X _ _
  		return this.getPlayerAt(1,1);																				// X _ _
  	} else if(this.getPlayerAt(1,1) == this.getPlayerAt(2,2) &&		// X _ _
  		this.getPlayerAt(2,2) == this.getPlayerAt(3,3)){						// _ X _
  		return this.getPlayerAt(1,1);																// _ _ X
  	} else if(this.getPlayerAt(2,1) == this.getPlayerAt(2,2) &&						// _ _ _
  		this.getPlayerAt(2,2) == this.getPlayerAt(2,3)) {										// X X X
  		return this.getPlayerAt(2,1);																				// _ _ _
  	} else if(this.getPlayerAt(3,1) == this.getPlayerAt(3,2) &&		// _ _ _
  		this.getPlayerAt(3,2) == this.getPlayerAt(3,3)) {						// _ _ _
  		return this.getPlayerAt(3,1);																// X X X
  	} else if(this.getPlayerAt(1,2) == this.getPlayerAt(2,2) &&						// _ X _
  		this.getPlayerAt(2,2) == this.getPlayerAt(3,2)) {										// _ X _
  		return this.getPlayerAt(1,2);																				// _ X _
  	} else if(this.getPlayerAt(1,3) == this.getPlayerAt(2,3) &&		// _ _ X
  		this.getPlayerAt(2,3) == this.getPlayerAt(3,3)) {						// _ _ X
  		return this.getPlayerAt(1,3);																// _ _ X
  	} else if(this.getPlayerAt(1,3) == this.getPlayerAt(2,2) &&						// _ _ X
  		this.getPlayerAt(2,2) == this.getPlayerAt(3,1)) {										// _ X _
  		return this.getPlayerAt(1,3);																				// X _ _
  	} else if(this.board.reduce(function(prevVal, curEl) {
  		return curEl != null ? 1 : 0;
  	}, 0) == 9) {
  		return constants.PLAYERS.NOONE;
  	} else {
  		return false;
  	}
  }
}
