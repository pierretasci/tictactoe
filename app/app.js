import React from "react";
import GameStore from "scripts/stores/game";
import Header from "scripts/components/header/Header";
import Board from "scripts/components/board/Board";

export default class App extends React.Component {
	render() {
		return (
			<div className="container">
				<Header />
				<Board />
			</div>
		);
	}
}

React.render(<App />, document.body);
