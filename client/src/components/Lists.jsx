import React from "react";
import { Link } from "react-router-dom";
import OneInputForm from "./OneInputForm";

function Lists(props) {

	function handleFormSubmit(listTitle) {
		props.onAddList(listTitle, props.history)
	}

	return (
		<div className="lists">

			<h1>Lists</h1>

			<OneInputForm onFormSubmit={handleFormSubmit} placeholder="List name" buttonText="Add list" />

			{Object.keys(props.lists).map((key) => {
				let listItem = props.lists[key]
				
				return (
					<div key={key} >
						<Link to={`/tasks/${key}`} >
							<h2>{listItem.title}</h2>
						</Link>
						<button onClick={() => { props.onDeleteList(key) }}>Delete List</button>
					</div>
				)
			})
			}
		</div >
	);
}

export default Lists;
