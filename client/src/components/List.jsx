import React, { Component } from "react";
import { connect } from "react-redux";
import ListItem from "./ListItem";
import { addListItem } from "../store/actions";

class List extends Component {
	constructor(props) {
		super(props);
		this.getList = this.getList.bind(this);
		this.addListItem = this.addListItem.bind(this);
		this.state = {
			title: "",
			sublist: [],
		};
	}

	componentWillMount() {
		this.getList();
	}

	getList() {
		var url = window.location.href.split("/");
		var paramID = url.pop() || url.pop(); // handle potential trailing slash
		let lists = this.props.lists;

		lists.map((list) => {
			if (list.id == paramID) {
				this.setState(() => {
					let newList = this.state.sublist.concat(list.sublist);
					return {
						title: list.title,
						sublist: newList,
					};
				});
			}
		});
	}

	addListItem(e) {
		e.preventDefault();
		let listTitle = e.target.title.value;
		this.props.addListItem(listTitle);
		e.target.title.value = "";
	}

	render() {
		return (
			<div>
				{this.state.title}

				<form onSubmit={this.addListItem}>
					<label>
						Add new list item:
						<input type="text" name="title" placeholder="List item" />
					</label>
					<input type="submit" value="Submit" />
				</form>

				{(this.state.sublist || []).map((item) => (
					<ListItem id={item.id} title={item.listItem} />
				))}
			</div>
		);
	}
}

function mapStateToProps(state) {
	const { lists } = state;
	return { lists };
}

export default connect(mapStateToProps, {
	addListItem,
})(List);
