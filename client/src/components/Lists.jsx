import React from "react";
import { Link } from "react-router-dom";

function Lists() {
	return (
		<div>
			<h3>Please see your lists below.</h3>
			<Link to="/list/1">List 1</Link>
			<br />
			<Link to="/list/2">List 2</Link>
		</div>
	);
}

export default Lists;
