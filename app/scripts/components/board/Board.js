import React from "react";
import Square from "./Square";
import GameStore from "../../stores/game";
import constants from "../../core/constants";

const NUM_SQUARES = 9;
let getBoard = GameStore.getBoard;

export default class Board extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			squares: getBoard()
		};
		this.onChange = this.onChange.bind(this);
	}

	componentWillMount() {
		GameStore.addChangeListener(this.onChange);
	}

	componentWillUnmount() {
		GameStore.removeChangeListener(this.onChange);
	}

	render() {
		let squares = [];
		for(let i = 0; i < NUM_SQUARES; i++) {
			let player = null;
			if(this.state.squares) {
				player = this.state.squares.board[i];
			}
			squares.push(<Square index={i} key={i} player={player} />);
		}

		let loading = null;
		if(GameStore.getActivePlayer() === constants.PLAYERS.COMPUTER) {
			loading = (<div className="loading">
				<div className="sk-rotating-plane"></div>
			</div>);
		}

		return (
			<div className="board-wrapper">
				<div className={"board " +
					(GameStore.getActivePlayer() === constants.PLAYERS.COMPUTER ?
						"computer" : "human")}>
					<div className="board-cover" />
					{squares}
					{loading}
				</div>
			</div>
		);
	}

	onChange() {
		this.setState({
			squares: getBoard()
		});
	}
}
