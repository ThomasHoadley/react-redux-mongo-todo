import React, { Component } from "react";
import OneInputForm from "./OneInputForm";

class Tasks extends Component {
	constructor(props) {
		super(props);
		this.listID = this.props.match.params.id;
		this.taskIDs = this.props.lists[this.listID].tasks;
	};

	render() {
		const tasks = this.props.lists[this.listID].tasks.map((taskID, index) => {
			const taskText = this.props.tasks[taskID].text;
			return <p key={index}>{taskText}</p>
		})

		return (
			<div className="tasks-page">
				<h1>{this.props.lists[this.listID].title}</h1>
				<OneInputForm placeholder="Task name" buttonText="Add task" onFormSubmit={(taskName) => {
					this.props.onAddTask(this.listID, taskName)
				}} />

				<div className="task-item" >
					{tasks}
				</div>
			</div>
		);
	}
}

export default Tasks;
