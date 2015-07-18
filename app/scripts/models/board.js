import constants from "../core/constants";
import Move from "../models/move";

export default class Board {
	constructor() {
		this.board = new Array(9);
    this.board = this.board.map(function() {
      return null;
    });
		this.emptySpaces = 9;
	}

	clone() {
		var retVal = new Board();
		retVal.init(this.board.slice(0));
		return retVal;
	}

	init(initialBoard) {
		this.board = initialBoard;
		initialBoard.map(function(item) {
			if(item != null) {
				this.emptySpaces--;
			}
		}, this);
	}

	getPlayerAt(row, col) {
  	return this.board[(row - 1) * 3 + (col - 1)];
  }

  setPlayerAt(row, col, player) {
  	if(this.getPlayerAt(row, col) == null) {
  		this.board[(row - 1) * 3 + (col - 1)] = player;
  		this.emptySpaces--;
  	}
  }

  getPossibleMovesForPlayer(player) {
    var retMoves = [];
    for(var i = 0; i < 9; i++) {
      var row = Math.floor(i / 3) + 1;
      var col = i % 3 + 1;
      if(this.getPlayerAt(row, col) == null) {
        retMoves.push(new Move(row, col, player));
      }
    }

    return retMoves;
  }

  getAvailableSpaces() {
  	return this.emptySpaces;
  }

  isGameOver() {
  	return (this.emptySpaces == 0 || this.getGameWinner() != false);
  }

  getGameWinner() {
  	if(this.getPlayerAt(1,1) != null &&
  		this.getPlayerAt(1,1) == this.getPlayerAt(1,2) &&					// X X X
  		this.getPlayerAt(1,2) == this.getPlayerAt(1,3)) {						// _ _ _
  		return this.getPlayerAt(1,1);																// _ _ _
  	} else if(this.getPlayerAt(1,1) != null &&
  		this.getPlayerAt(1,1) == this.getPlayerAt(2,1) &&						// X _ _
  		this.getPlayerAt(2,1) == this.getPlayerAt(3,1)) {										// X _ _
  		return this.getPlayerAt(1,1);																				// X _ _
  	} else if(this.getPlayerAt(1,1) != null &&
  		this.getPlayerAt(1,1) == this.getPlayerAt(2,2) &&		// X _ _
  		this.getPlayerAt(2,2) == this.getPlayerAt(3,3)){						// _ X _
  		return this.getPlayerAt(1,1);																// _ _ X
  	} else if(this.getPlayerAt(2,1) != null &&
  		this.getPlayerAt(2,1) == this.getPlayerAt(2,2) &&						// _ _ _
  		this.getPlayerAt(2,2) == this.getPlayerAt(2,3)) {										// X X X
  		return this.getPlayerAt(2,1);																				// _ _ _
  	} else if(this.getPlayerAt(3,1) != null &&
  		this.getPlayerAt(3,1) == this.getPlayerAt(3,2) &&		// _ _ _
  		this.getPlayerAt(3,2) == this.getPlayerAt(3,3)) {						// _ _ _
  		return this.getPlayerAt(3,1);																// X X X
  	} else if(this.getPlayerAt(1,2) != null &&
  		this.getPlayerAt(1,2) == this.getPlayerAt(2,2) &&						// _ X _
  		this.getPlayerAt(2,2) == this.getPlayerAt(3,2)) {										// _ X _
  		return this.getPlayerAt(1,2);																				// _ X _
  	} else if(this.getPlayerAt(1,3) != null &&
  		this.getPlayerAt(1,3) == this.getPlayerAt(2,3) &&		// _ _ X
  		this.getPlayerAt(2,3) == this.getPlayerAt(3,3)) {						// _ _ X
  		return this.getPlayerAt(1,3);																// _ _ X
  	} else if(this.getPlayerAt(1,3) != null &&
  		this.getPlayerAt(1,3) == this.getPlayerAt(2,2) &&						// _ _ X
  		this.getPlayerAt(2,2) == this.getPlayerAt(3,1)) {										// _ X _
  		return this.getPlayerAt(1,3);																				// X _ _
  	} else if(this.emptySpaces == 0) {
  		return constants.PLAYERS.NOONE;
  	} else {
  		return false;
  	}
  }
}
