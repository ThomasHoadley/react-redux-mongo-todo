import React from "react";

function ListItem({ title, id }) {
	return (
		<div className="list-item">
			{title}
			<span className="delete-list" data-id={`${id}`}>
				X
			</span>
		</div>
	);
}

export default ListItem;
