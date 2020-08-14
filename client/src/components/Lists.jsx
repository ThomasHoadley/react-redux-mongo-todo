import React, { Component } from "react";
import ListForm from "./ListForm";

class Lists extends Component {
	constructor(props) {
		super(props)
		this.handleFormSubmit = this.handleFormSubmit.bind(this)
	}

	handleFormSubmit(e) {
		console.log(e)
	}

	render() {
		return (
			<div className="lists">

				<ListForm onFormSubmit={this.handleFormSubmit} />

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
