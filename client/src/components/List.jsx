import React, { Component } from "react";
import { connect } from "react-redux";
import ListItem from "./ListItem";
import { addListItem } from "../store/actions";

class List extends Component {
	constructor(props) {
		super(props);
	}

  // TODO: use controlled state, or a ref to clear the value
	addListItem(e) {
		e.preventDefault();
		let listTitle = e.target.title.value;
		this.props.addListItem(listTitle);
		e.target.title.value = "";
	}

	render() {
		console.log(this.props)
		return (
			<div>
				{this.props.title}

				<form onSubmit={this.addListItem}>
					<label>
						Add new list item:
						<input type="text" name="title" placeholder="List item" />
					</label>
					<input type="submit" value="Submit" />
				</form>

				{(this.props.sublist || []).map((item) => (
					<ListItem id={item.id} title={item.listItem} />
				))}
			</div>
		);
	}
}

// TODO: derive list state from store state and ownProps here.
function mapStateToProps(state, ownProps) {
	const { id } = ownProps.match.params
	const { lists } = state;

	const list = lists.filter(list => {
		console.log(list)
		return list.id === id
	})

	console.log(list)

	// state.lists.map((list) => {
	// 	if (list.id == paramID) {
	// 		this.setState(() => {
	// 			let newList = this.state.sublist.concat(list.sublist);
	// 			return {
	// 				title: list.title,
	// 				sublist: newList,
	// 			};
	// 		});
	// 	}
	// });

	return { ...list };
}

export default connect(mapStateToProps, {
	addListItem,
})(List);
