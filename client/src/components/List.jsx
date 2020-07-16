import React, { Component } from "react";
import { connect } from "react-redux";
import ListItem from "./ListItem";

class List extends Component {
	constructor(props) {
		super(props);
		this.getList = this.getList.bind(this);
		this.renderList = this.renderList.bind(this);
		this.state = {
			list: {},
		};
	}

	componentWillMount() {
		this.getList();
	}

	getList() {
		var url = window.location.href.split("/");
		var paramID = url.pop() || url.pop(); // handle potential trailing slash

		let list = this.props.lists.filter((list) => {
			return list.id === paramID;
		});
		this.setState({ list });
	}

	renderList() {
		let list = this.state.list[0];
		console.log(list);
	}

	render() {
		this.renderList();
		return (
			<div>
				<h3>{this.state.list.title}</h3>
				<input type="text" placeholder="Add items" />
			</div>
		);
	}
}

function mapStateToProps(state) {
	const { lists } = state;
	return { lists };
}

export default connect(mapStateToProps)(List);
