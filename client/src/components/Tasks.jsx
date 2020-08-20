import React, { Component } from "react";
import OneInputForm from "./OneInputForm";
import Task from "./Task";

class Tasks extends Component {
	constructor(props) {
		super(props);
		this.listID = this.props.match.params.id;
		this.taskIDs = this.props.lists[this.listID].tasks;
	}

	render() {
		const tasks = this.props.lists[this.listID].tasks.map((taskID, index) => {
			const task = this.props.tasks[taskID];

			if (!task) return null;
			const { complete, text } = task;
			return (
				<Task
					key={index}
					complete={complete}
					onDelete={() => this.props.onDeleteTask(this.listID, taskID)}
					onComplete={() => this.props.onToggleTask(taskID)}
					taskText={text}
				/>
			);
		});

		return (
			<div className="tasks-page">
				<h1>{this.props.lists[this.listID].title}</h1>
				<OneInputForm
					placeholder="Task name"
					buttonText="Add task"
					onFormSubmit={(taskName) => {
						this.props.onAddTask(this.listID, taskName);
					}}
				/>

				<div className="task-item">{tasks}</div>
			</div>
		);
	}
}

export default Tasks;
