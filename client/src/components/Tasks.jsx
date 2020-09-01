import React from "react";
import OneInputForm from "./OneInputForm";
import Task from "./Task";
import { useListTasks } from '../hooks/useListTasks'
import { useTasksAndLists } from "../hooks/useTasksAndLists";

function Tasks(props) {
	const listID = props.match.params.id;
	// This is another custom hook, that hides logic related to
	// a certain list in one place.
	const {
		title,
		listTasks,
		addTaskToList,
		removeTaskFromList,
	} = useListTasks(listID);
	// For toggling lists, we use the shared hook for now.
	const { toggleTask } = useTasksAndLists();

	// Added an extra length check to avoid an error
	const tasks = listTasks.length > 0 && listTasks.map(({ id, complete, text }) => {
		return (
			<Task
				key={id}
				complete={complete}
				onDelete={() => removeTaskFromList(id)}
				onComplete={() => toggleTask(id)}
				taskText={text}
			/>
		);
	});

	return (
		<div className="tasks-page">
			<h1>{title}</h1>
			<OneInputForm
				placeholder="Task name"
				buttonText="Add task"
				onFormSubmit={addTaskToList}
			/>
			<div className="task-item">{tasks}</div>
		</div>
	);
}

export default Tasks;
