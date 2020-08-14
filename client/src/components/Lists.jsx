import React, { Component } from "react";

class Lists extends Component {
	constructor(props) {
		super(props)
	}
	render() {
		return (
			<div className="lists">
				<h1>Lists</h1>

				{Object.keys(this.props.lists).map((key) => {
					let listItem = this.props.lists[key]
					return (
						<a href={`/tasks/${key}`} key={key} >
							<h2>{listItem.title}</h2>
						</a>
					)
				})
				}
			</div >
		);
	}
}

export default Lists;
