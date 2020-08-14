import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

import listsState from "./state/listsState";

import Header from "./components/Header";
import Lists from "./components/Lists";
import Tasks from "./components/Tasks";


function App() {
	return (
		<Router>
			<div className="app">
				<Header />

				<Switch>
					<Route exact path="/">
						<Lists lists={listsState} />
					</Route>

					{/* List ID is passed in */}
					<Route path="/tasks/:id" render={(props) => <Tasks {...props} lists={listsState} />}></Route>

				</Switch>
			</div>
		</Router>
	);
}

export default App;
