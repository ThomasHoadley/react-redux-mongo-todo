import React from "react";
import { Link } from "react-router-dom";

function Header() {
	return (
		<div>
			<h1>Todo list manager</h1>
			<Link to="/">All Lists</Link>
		</div>
	);
}

export default Header;
