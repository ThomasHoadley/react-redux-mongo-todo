import React, { Component } from "react";
import ListForm from "./ListForm";
import listsState from "../state/listsState";

class Lists extends Component {
	constructor() {
		super()
		this.handleFormSubmit = this.handleFormSubmit.bind(this)
		this.state = {
			lists: listsState
		}
	}

	handleFormSubmit(e) {

		this.setState(prevState => {
			const newID = Object.keys(prevState.lists).length + 1;

			return (
				{
					lists: {
						...prevState.lists,
						[newID]: {
							title: e,
							tasks: [1, 2, 3]
						}
					}
				})
		})
	}

	render() {
		return (
			<div className="lists">

				<ListForm onFormSubmit={this.handleFormSubmit} />

				<h1>Lists</h1>
				{Object.keys(this.state.lists).map((key) => {
					let listItem = this.state.lists[key]
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
