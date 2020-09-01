import React, { Component } from "react";
import OneInputForm from "./OneInputForm";
import Task from "./Task";

function Tasks(props) {

	const listID = props.match.params.id;

	const tasks = props.lists[listID].tasks.map((taskID, index) => {
		const task = props.tasks[taskID];

		if (!task) return null;

		const { complete, text } = task;
		return (
			<Task
				key={index}
				complete={complete}
				onDelete={() => props.onDeleteTask(listID, taskID)}
				onComplete={() => props.onToggleTask(taskID)}
				taskText={text}
			/>
		);
	});

	return (
		<div className="tasks-page">
			<h1>{props.lists[listID].title}</h1>
			<OneInputForm
				placeholder="Task name"
				buttonText="Add task"
				onFormSubmit={(taskName) => {
					props.onAddTask(listID, taskName);
				}}
			/>

			<div className="task-item">{tasks}</div>
		</div>
	);
}

export default Tasks;
