import React, { useState } from "react";
import { Link } from "react-router-dom";
import OneInputForm from "./OneInputForm";
import { useTasksAndLists } from "../hooks/useTasksAndLists";

// function useToggleState(initialBoolean) {
// 	const [isActive, setActive] = useState(initialBoolean)
// 	const toggle = () => setActive(!isActive)
// 	return {isActive, toggle}
// }

function Lists() {
	// This component uses a custom hook, which gets values directly
	// from our context.
	const { lists, addList, deleteList } = useTasksAndLists()
	// const { isActive, toggle } = useToggleState(true)

	function handleFormSubmit(listTitle) {
		addList(listTitle)
	}

	return (
		<div className="lists">

			<h1>Lists</h1>

			<OneInputForm label="Add a list" onFormSubmit={handleFormSubmit} placeholder="List name" buttonText="Add list" />

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
			{/* {isActive ? 'active' : 'inactive'}
			<button onClick={toggle}>Toggle</button> */}
		</div >
	);
}

export default Lists;
