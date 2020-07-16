import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./components/Header";
import Lists from "./components/Lists";
import List from "./components/List";

function App() {
	return (
		<Router>
			<div className="app">
				<Header />
				<Switch>
					<Route exact path="/">
						<Lists />
					</Route>
					<Route path="/list/:id" children={<List />} />
				</Switch>
			</div>
		</Router>
	);
}

export default App;
