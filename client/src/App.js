import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

import listsState from "./state/listsState";

import Header from "./components/Header";
import Lists from "./components/Lists";
import Tasks from "./components/Tasks";


class App extends Component {
	constructor() {
		super()

		this.updateState = this.updateState.bind(this)
		this.state = {
			lists: JSON.parse(localStorage.getItem('lists')) || listsState
		};
	}

	updateState(e) {
		console.log(e);
		this.setState(e);
		localStorage.setItem('lists', JSON.stringify(e));
	}

	render() {
		return (
			<Router>
				<div className="app">
					<Header />

					<Switch>
						<Route exact path="/">
							<Lists lists={this.state.lists} onListsSubmit={this.updateState} />
						</Route>

						{/* List ID is passed in */}
						<Route path="/tasks/:id" render={(props) => <Tasks {...props} lists={this.state.lists} />}></Route>

					</Switch>
				</div>
			</Router >
		);
	}
}

export default App;
