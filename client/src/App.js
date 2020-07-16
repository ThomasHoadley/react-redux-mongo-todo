import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

import Header from "./components/Header";
import Lists from "./components/Lists";
import List from "./components/List";

function App({ store }) {
	return (
		<Provider store={store}>
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
		</Provider>
	);
}

export default App;
