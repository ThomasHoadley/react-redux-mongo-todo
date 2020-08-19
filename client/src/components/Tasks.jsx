import React, { Component } from "react";
import OneInputForm from "./OneInputForm";
import Task from "./Task";

class Tasks extends Component {
	constructor(props) {
		super(props);
		this.listID = this.props.match.params.id;
		this.taskIDs = this.props.lists[this.listID].tasks;
	};

	render() {
		const tasks = this.props.lists[this.listID].tasks.map((taskID, index) => {
			const taskText = this.props.tasks[taskID].text;
			const complete = this.props.tasks[taskID].complete;
			return <Task key={index} complete={complete} taskID={taskID} listID={this.listID} taskText={taskText} onDeleteTask={this.props.onDeleteTask} onToggleTask={this.props.onToggleTask} />
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
