import Dispatcher from "../core/dispatcher";
import constants from "../core/constants";

export default {
	startGameHuman: function() {
		Dispatcher.dispatch({
			actionType: constants.ACTIONS.START_GAME,
			initialPlayer: constants.PLAYERS.HUMAN
		});
	},
	startGameComputer: function() {
		Dispatcher.dispatch({
			actionType: constants.ACTIONS.START_GAME,
			initialPlayer: constants.PLAYERS.COMPUTER
		});
	},
	enactPlayerMove: function(index) {
		Dispatcher.dispatch({
			actionType: constants.ACTIONS.ENACT_PLAYER_MOVE,
			playerMove: {
				row: Math.floor(index / 3) + 1,
				col: index % 3 + 1,
				player: constants.PLAYERS.HUMAN
			}
		});
	}
};
