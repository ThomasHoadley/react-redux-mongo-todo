import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { v4 as uui } from "uuid";
import axios from "axios";
import "./App.css";

import Header from "./components/Header";
import Lists from "./components/Lists";
import Tasks from "./components/Tasks";
import { toIdMap } from "./common/toIdMap";

// TODO: Check immutability of the add task.
// TODO: Can it be abstracted?
// TODO: Pull in the list from the server file.
// TODO: Add redirect on add list to new list.
// TODO: Introduce some unit tests.
// TODO: Introduce redux / redux toolkit.
// TODO: Introduce CSS

class App extends Component {
	constructor() {
		super();

		this.addList = this.addList.bind(this);
		this.deleteList = this.deleteList.bind(this);
		this.addListTask = this.addListTask.bind(this);
		this.toggleTask = this.toggleTask.bind(this);
		this.deleteTask = this.deleteTask.bind(this);

		this.state = {
			error: null,
			loading: true,
			lists: JSON.parse(localStorage.getItem("lists")) || {},
			tasks: JSON.parse(localStorage.getItem("tasks")) || {},
		};
	}

	async componentDidMount() {
		const getData = async (endpoint) => {
			try {
				const { data } = await axios.get(endpoint);
				return toIdMap(data.items);
			} catch (error) {
				this.setState({
					error,
					loading: false,
				});
			}
		};

		const getBoth = async () => {
			const lists = await getData("/api/lists");
			const tasks = await getData("/api/tasks");

			return {
				lists,
				tasks,
			};
		};

		const state = await getBoth();

		this.setState({
			loading: false,
			// ...state,
		});
	}

	// LIST FUNCTIONS

	addList(listItem, history) {
		const oldLists = this.state.lists;
		const newID = uui();

		const lists = {
			...oldLists,
			[newID]: {
				title: listItem,
				tasks: [],
			},
		};

		this.setState({
			lists,
		});
		localStorage.setItem("lists", JSON.stringify(lists));

		// We want to redirect after state has been set here.
		// but it needs to be async.
	}

	deleteList(listKey) {
		let lists = {
			...this.state.lists,
		};
		let tasks = {
			...this.state.tasks,
		};

		const listTasks = lists[listKey].tasks;

		// TODO: Check immutability / best way of doing this?
		listTasks.map((listTask) => {
			delete tasks[listTask];
		});
		// Delete the list
		delete lists[listKey];

		this.setState({
			...this.state.tasks,
			...this.state.lists,
			tasks: tasks,
			lists: lists,
		});
		localStorage.setItem("lists", JSON.stringify(lists));
		localStorage.setItem("tasks", JSON.stringify(tasks));
	}

	// TASK FUNCTIONS

	// Add Tasks

	addListTask(taskId, newTask) {
		const randomTaskId = uui();

		const tasks = {
			...this.state.tasks,
			[randomTaskId]: {
				text: newTask,
				complete: false,
			},
		};

		const lists = {
			...this.state.lists,
			[taskId]: {
				...this.state.lists[taskId],
				tasks: [...this.state.lists[taskId].tasks, randomTaskId],
			},
		};

		this.setState({
			lists,
			tasks,
		});
		localStorage.setItem("lists", JSON.stringify(lists));
		localStorage.setItem("tasks", JSON.stringify(tasks));
	}

	// Toogle Task

	toggleTask(taskID) {
		const tasks = {
			...this.state.tasks,
			[taskID]: {
				...this.state.tasks[taskID],
				complete: !this.state.tasks[taskID].complete,
			},
		};
		this.setState({
			...this.state.lists,
			tasks: tasks,
		});

		localStorage.setItem("tasks", JSON.stringify(tasks));
	}

	// Delete task

	deleteTask(listId, taskID) {
		const updatedTasks = {
			...this.state.tasks,
		};

		const updatedLists = {
			...this.state.lists,
			[listId]: {
				...this.state.lists[listId],
				tasks: this.state.lists[listId].tasks.filter((id) => id !== taskID),
			},
		};

		delete updatedTasks[taskID];

		this.setState({
			lists: updatedLists,
			tasks: updatedTasks,
		});
		// localStorage.setItem('lists', JSON.stringify(lists));
		// localStorage.setItem('tasks', JSON.stringify(updatedTasks));
	}

	render() {
		if (this.state.loading) {
			return <h1>Loading...</h1>;
		}

		if (this.state.error) {
			return <h1>{this.state.error.message || "Something went wrong"}</h1>;
		}

		return (
			<Router>
				<div className="app">
					<Header />

					<Switch>
						<Route
							exact
							path="/"
							render={(props) => (
								<Lists
									{...props}
									onDeleteList={this.deleteList}
									lists={this.state.lists}
									onAddList={this.addList}
								/>
							)}
						/>
						{/* </Route> */}

						{/* List ID is passed in */}
						<Route
							path="/tasks/:id"
							render={(props) => (
								<Tasks
									{...props}
									lists={this.state.lists}
									tasks={this.state.tasks}
									onDeleteTask={this.deleteTask}
									onToggleTask={this.toggleTask}
									onAddTask={this.addListTask}
								/>
							)}
						></Route>
					</Switch>
				</div>
			</Router>
		);
	}
}

export default App;
