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
						{/* TODO: use component prop to get router-props */}
						<Route exact path="/" component={Lists} />
						{/* TODO avoid mising children props */}
						<Route path="/list/:id" component={List} />
					</Switch>
				</div>
			</Router>
		</Provider>
	);
}

export default App;
