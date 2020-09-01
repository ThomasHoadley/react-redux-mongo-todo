import React from "react";
import { Link } from "react-router-dom";
import OneInputForm from "./OneInputForm";
import { useTasksAndLists } from "../hooks/useTasksAndLists";

function Lists() {
	// This component uses a custom hook, which gets values directly
	// from our context.
	const { lists, addList, deleteList } = useTasksAndLists()

	function handleFormSubmit(listTitle) {
		addList(listTitle)
	}

	return (
		<div className="lists">

			<h1>Lists</h1>

			<OneInputForm onFormSubmit={handleFormSubmit} placeholder="List name" buttonText="Add list" />

			{Object.keys(lists).map((key) => {
				let listItem = lists[key]
				
				return (
					<div key={key} >
						<Link to={`/tasks/${key}`} >
							<h2>{listItem.title}</h2>
						</Link>
						<button onClick={() => deleteList(key)}>Delete List</button>
					</div>
				)
			})
			}
		</div >
	);
}

export default Lists;
