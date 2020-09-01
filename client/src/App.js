import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

import Header from "./components/Header";
import Lists from "./components/Lists";
import Tasks from "./components/Tasks";
import { TasksAndListsProvider } from './contexts/taskContext'

// TODO: Can it be abstracted?
// TODO: Pull in the list from the server file.
// TODO: Add redirect on add list to new list.
// TODO: Introduce some unit tests.
// TODO: Introduce redux / redux toolkit.
// TODO: Introduce CSS

class App extends Component {
	render() {
		// if (this.state.loading) {
		// 	return <h1>Loading...</h1>;
		// }

		// if (this.state.error) {
		// 	return <h1>{this.state.error.message || "Something went wrong"}</h1>;
		// }

		return (
			<Router>
				<div className="app">
					<TasksAndListsProvider>
						<Header />
						<Switch>
							<Route exact path="/" component={Lists} />
							<Route exact path="/tasks/:id" component={Tasks} />
						</Switch>
					</TasksAndListsProvider>
				</div>
			</Router>
		);
	}
}

export default App;