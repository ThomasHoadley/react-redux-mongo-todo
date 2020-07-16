import React from "react";
import { Link } from "react-router-dom";

function Header() {
	return (
		<div>
			<h1>Todo list manager</h1>
			<ul>
				<li>
					<Link to="/">All Lists</Link>
				</li>
			</ul>
		</div>
	);
}

export default Header;
