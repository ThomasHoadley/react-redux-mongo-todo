import React, { Component } from "react";
import tasksState from "../state/tasksState";

class Tasks extends Component {
	constructor(props) {
		super(props);
		this.listID = this.props.match.params.id;
		this.tasks = this.props.lists[this.listID].tasks;
	}
	render() {
		return (
			<div className="tasks-page">
				<h1>{this.props.lists[this.listID].title}</h1>

				<div className="task-item" >
					{
						this.tasks.map(taskID => {
							let taskText = tasksState[taskID].text;
							
							return <p key={taskID}>{taskText}</p>
						})
					}
				</div>
			</div>
		);
	}
}

export default Tasks;
