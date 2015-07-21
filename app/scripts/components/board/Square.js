import React from "react";

export default class Square extends React.Component {
	render() {
		let className = "square ";
		className += "square-" + this.props.index;

		return (
			<div className={className}>
				Hello
			</div>
		);
	}
}
