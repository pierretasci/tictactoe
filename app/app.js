import React from "react";
import GameStore from "scripts/stores/game";
import Header from "scripts/components/header/Header";
import Board from "scripts/components/board/Board";
import constants from "scripts/core/constants";
import GameActions from "scripts/actions/gameactions";

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			startGame: constants.START_GAME_STATE.PRE
		};

		this.startGame = this.startGame.bind(this);
		this.startGameHuman = this.startGameHuman.bind(this);
		this.startGameComputer = this.startGameComputer.bind(this);
		this.playAgain = this.playAgain.bind(this);
	}

	render() {
		let startGameSection = null;
		switch(this.state.startGame) {
			case constants.START_GAME_STATE.NEW_GAME:
				startGameSection = (
					<div className="choose-competitor">
						<button type="button" onClick={this.startGameHuman}>I want to go first</button>
						<button type="button" onClick={this.startGameComputer}>Computer, you go first</button>
					</div>);
			break;
			case constants.START_GAME_STATE.PRE:
				startGameSection = (
					<button className="new-game-button" type="button" onClick={this.startGame}>
						New Game
					</button>);
			break;
			case constants.START_GAME_STATE.PLAY_AGAIN:
				startGameSection = (
					<button className="new-game-button" type="button" onClick={this.playAgain}>
						Play again?
					</button>);
			break;
			default:
				startGameSection = null;
		};

		return (
			<div>
				<Header />
				<div className="container">
					<div className="game-section">
						{startGameSection}
					</div>
					<Board />
				</div>
			</div>
		);
	}

	startGame() {
		this.setState({
			startGame: constants.START_GAME_STATE.NEW_GAME
		});
	}

	startGameHuman() {
		GameActions.startGameHuman();
		this.setState({
			startGame: constants.START_GAME_STATE.PLAY_AGAIN
		});
	}

	startGameComputer() {
		GameActions.startGameComputer();
		this.setState({
			startGame: constants.START_GAME_STATE.PLAY_AGAIN
		});
	}

	playAgain() {
		this.setState({
			startGame: constants.START_GAME_STATE.NEW_GAME
		});
	}
}

React.render(<App />, document.body);
