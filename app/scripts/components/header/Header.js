import React from "react";
import GameActions from "../../actions/gameactions";

export default class Header extends React.Component {
	render() {
		return (
			<header>
				<div className="title-section">
					<h1>Tic Tac Toe</h1>
						<div className="game-section">
						Start game with first move:
						<button type="button" onClick={this.startGameComputer}>
							Computer
						</button>
						or
						<button type="button" onClick={this.startGameHuman}>
							Human
						</button>
					</div>
				</div>
			</header>
		);
	}

	startGameComputer() {
		GameActions.startGameComputer();
	}

	startGameHuman() {
		GameActions.startGameHuman();
	}
}
