import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { v4 as uui } from 'uuid';
import "./App.css";

import initialLists from "./state/listsState";
import initialTasks from "./state/tasksState";

import Header from "./components/Header";
import Lists from "./components/Lists";
import Tasks from "./components/Tasks";

// TODO: Add redirect on add list to new list.
// TODO: Check immutability of the add task.
// Can this be abstracted?

class App extends Component {
	constructor() {
		super()

		this.addList = this.addList.bind(this)
		this.deleteList = this.deleteList.bind(this)
		this.addListTask = this.addListTask.bind(this)
		this.toggleTask = this.toggleTask.bind(this)
		this.deleteTask = this.deleteTask.bind(this)

		this.state = {
			lists: JSON.parse(localStorage.getItem('lists')) || initialLists,
			tasks: JSON.parse(localStorage.getItem('tasks')) || initialTasks
		};
	}

	// LIST FUNCTIONS

	addList(listItem) {
		const oldLists = this.state.lists
		const newID = uui();

		const lists = {
			...oldLists,
			[newID]: {
				title: listItem,
				tasks: []
			}
		}

		this.setState({
			lists
		});
		localStorage.setItem('lists', JSON.stringify(lists));
	}

	deleteList(listKey) {
		let lists = {
			...this.state.lists
		}
		let tasks = {
			...this.state.tasks
		}

		const listTasks = lists[listKey].tasks;

		// TODO: Check immutability / best way of doing this
		listTasks.map(listTask => {
			delete tasks[listTask];
		})
		// Delete the list
		delete lists[listKey]

		this.setState({
			...this.state.tasks,
			...this.state.lists,
			tasks: tasks,
			lists: lists
		})
		localStorage.setItem('lists', JSON.stringify(lists));
		localStorage.setItem('tasks', JSON.stringify(tasks));
	}

	// TASK FUNCTIONS

	// Add Tasks

	addListTask(taskId, newTask) {
		const randomTaskId = uui();

		const tasks = {
			...this.state.tasks,
			[randomTaskId]: {
				text: newTask,
				complete: false
			}
		}

		const lists = {
			...this.state.lists,
			[taskId]: {
				...this.state.lists[taskId],
				tasks: [
					...this.state.lists[taskId].tasks,
					randomTaskId
				]
			}
		}

		this.setState({
			lists,
			tasks
		})
		localStorage.setItem('lists', JSON.stringify(lists));
		localStorage.setItem('tasks', JSON.stringify(tasks));
	}

	// Toogle Task

	toggleTask(taskID) {
		const tasks = {
			...this.state.tasks,
			[taskID]: {
				...this.state.tasks[taskID],
				complete: !this.state.tasks[taskID].complete
			}
		}
		this.setState({
			...this.state.lists,
			tasks: tasks
		})

		localStorage.setItem('tasks', JSON.stringify(tasks));
	}

	// Delete task

	deleteTask(listID, taskID) {
		console.log(`delete ${taskID}`);

		const lists = {
			...this.state.lists,
			[listID]: {
				...this.state.lists[listID],
				// TODO: Is this bit immutable?
				// I'm not sure how to spread the tasks in an immutable way?
				tasks: this.state.lists[listID].tasks.filter((task) => task !== taskID)
			}
		}
		this.setState({
			lists: lists
		})
		localStorage.setItem('lists', JSON.stringify(lists));
		// remove it from the array.
		// remove it from the task state
	}

	render() {

		return (
			<Router>
				<div className="app">
					<Header />

					<Switch>
						<Route exact path="/">
							<Lists lists={this.state.lists} onAddList={this.addList} onDeleteList={this.deleteList} />
						</Route>

						{/* List ID is passed in */}
						<Route path="/tasks/:id" render={(props) => <Tasks {...props} lists={this.state.lists} tasks={this.state.tasks} onDeleteTask={this.deleteTask} onToggleTask={this.toggleTask} onAddTask={this.addListTask} />}></Route>
					</Switch>
				</div>
			</Router >
		);
	}
}

export default App;
