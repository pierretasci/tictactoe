import keyMirror from "keymirror";

export default {
	PLAYERS: keyMirror({
		HUMAN: null,
		COMPUTER: null,
		NOONE: null
	}),
	PIECES: keyMirror({
		x: null,
		o: null
	}),
	GAME_STATE: keyMirror({
		EMPTY: null,
		IN_PLAY: null,
		OVER: null
	}),
	ACTIONS: keyMirror({
		CALCULATE_NEXT_MOVE: null
	})
};
