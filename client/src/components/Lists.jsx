import React, { Component } from "react";
import OneInputForm from "./OneInputForm";

class Lists extends Component {
	constructor(props) {
		super(props)
		this.handleFormSubmit = this.handleFormSubmit.bind(this)
	}

	handleFormSubmit(listTitle) {
		console.log(this.props)
		console.log(listTitle)
		this.props.onAddList(listTitle)
	}

	render() {
		return (
			<div className="lists">

				<OneInputForm onFormSubmit={this.handleFormSubmit} placeholder="List name" buttonText="Add list" />

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
