import React from "react";
import Square from "./Square";

const NUM_SQUARES = 9;

export default class Board extends React.Component {

	render() {
		let squares = [];
		for(let i = 0; i < NUM_SQUARES; i++) {
			squares.push(<Square index={i} key={i} />);
		}

		return (
			<div className="board-wrapper">
				<div className="board">
					<div className="board-cover" />
					{squares}
				</div>
			</div>
		);
	}
}
