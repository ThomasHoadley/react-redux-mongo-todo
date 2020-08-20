import React, { Component } from "react";
import { Link } from "react-router-dom";
import OneInputForm from "./OneInputForm";

class Lists extends Component {
	constructor(props) {
		super(props)
		this.onDeleteList = this.props.onDeleteList.bind(this)
		this.handleFormSubmit = this.handleFormSubmit.bind(this)
	}

	handleFormSubmit(listTitle) {
		this.props.onAddList(listTitle, this.props.history)
	}

	render() {
		console.log(this.props)

		return (
			<div className="lists">

				<h1>Lists</h1>

				<OneInputForm onFormSubmit={this.handleFormSubmit} placeholder="List name" buttonText="Add list" />

				{Object.keys(this.props.lists).map((key) => {
					let listItem = this.props.lists[key]
					return (
						<div key={key} >
							<Link to={`/tasks/${key}`} >
								<h2>{listItem.title}</h2>
							</Link>
							<button onClick={() => { this.props.onDeleteList(key) }}>Delete List</button>
						</div>
					)
				})
				}
			</div >
		);
	}
}

export default Lists;
