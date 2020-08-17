import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

import initialLists from "./state/listsState";
import initialTasks from "./state/tasksState";


import Header from "./components/Header";
import Lists from "./components/Lists";
import Tasks from "./components/Tasks";


class App extends Component {
	constructor() {
		super()

		this.addList = this.addList.bind(this)
		this.addListTask = this.addListTask.bind(this)
		this.state = {
			lists: JSON.parse(localStorage.getItem('lists')) || initialLists,
			tasks: JSON.parse(localStorage.getItem('tasks')) || initialTasks
		};
	}

	addList(listItem) {
		const oldLists = this.state.lists
		const newID = Object.keys(oldLists).length + 1;

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

	addListTask(taskId, newTask) {
		const oldTasks = this.state.tasks
		const randomTaskId = Object.keys(oldTasks).length + 1;

		const tasks = {
			...this.state.tasks,
			[randomTaskId]: {
				text: newTask
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

	render() {
		console.log(this.state)

		return (
			<Router>
				<div className="app">
					<Header />

					<Switch>
						<Route exact path="/">
							<Lists lists={this.state.lists} onAddList={this.addList} />
						</Route>

						{/* List ID is passed in */}
						<Route path="/tasks/:id" render={(props) => <Tasks {...props} lists={this.state.lists} tasks={this.state.tasks} onAddTask={this.addListTask} />}></Route>
					</Switch>
				</div>
			</Router >
		);
	}
}

export default App;
