import React from "react";
import constants from "../../core/constants";
import GameStore from "../../stores/game";
import GameActions from "../../actions/gameactions";

export default class Square extends React.Component {
	constructor(props) {
		super(props);
		this.sendHumanAction = this.sendHumanAction.bind(this);
	}

	render() {
		let className = "square ";
		className += "square-" + this.props.index;

		let content = null;
		if(this.props.player) {
			// HUMAN IS ALWAYS X
			content = (this.props.player === constants.PLAYERS.HUMAN ?
				"human" : "computer");
		}

		let active = (!this.props.player &&
			(GameStore.getBoard() &&
			!GameStore.getBoard().isGameOver()) ? "active" : null &&
			GameStore.getActivePlayer() === constants.PLAYERS.HUMAN);

		return (
			<div className={[className, active].join(" ")} onClick={this.sendHumanAction}>
				<div className={["game-piece",content].join(" ")}>
				</div>
			</div>
		);
	}

	sendHumanAction(e) {
		if(GameStore.getActivePlayer() === constants.PLAYERS.HUMAN &&
			!GameStore.getBoard().isGameOver() &&
			this.props.player == null) {
			GameActions.enactPlayerMove(this.props.index);
		}

		e.preventDefault();
	}
}
