export default class Move {
	constructor(row, col, player) {
		this.row = row;
		this.col = col;
		this.player = player;
	}

	getRow() {
		return this.row;
	}

	getCol() {
		return this.col;
	}

	getPlayer() {
		return this.player;
	}
}
