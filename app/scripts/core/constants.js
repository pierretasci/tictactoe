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
		START_GAME: null,
		ENACT_PLAYER_MOVE: null
	}),
	START_GAME_STATE: keyMirror({
		PRE: null,
		NEW_GAME: null,
		PLAY_AGAIN: null
	})
};
