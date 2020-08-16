import React, { Component } from "react";
import ListForm from "./ListForm";

class Lists extends Component {
	constructor(props) {
		super(props)
		this.onListsSubmit = this.props.onListsSubmit;
		this.handleFormSubmit = this.handleFormSubmit.bind(this)
	}

	handleFormSubmit(e) {
		let oldLists = this.props.lists;
		let newID = Object.keys(oldLists).length + 1;

		let newLists = {
			...oldLists,
			[newID]: {
				title: e,
				tasks: []
			}
		}

		this.onListsSubmit(newLists);
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
