import React, { Component } from "react";
import { connect } from "react-redux";
import { addList, deleteList } from "../store/actions";
import { Link } from "react-router-dom";

class Lists extends Component {
	constructor(props) {
		super(props);
		this.addList = this.addList.bind(this);
		this.renderLists = this.renderLists.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
	}

	addList(e) {
		e.preventDefault();
		let listTitle = e.target.title.value;
		this.props.addList(listTitle);
		e.target.title.value = "";
	}

	handleDelete(e) {
		let listID = e.target.getAttribute("data-id");
		if (listID !== null) {
			this.props.deleteList(listID);
		}
	}

	renderLists() {
		const lists = [];
		this.props.lists.map((list) => {
			let { title, id } = list;
			lists.push(
				<div className="list-item">
					<Link to={`/list/${id}`}>{title}</Link>
					<span className="delete-list" data-id={`${id}`}>
						X
					</span>
				</div>
			);
		});
		return lists;
	}

	render() {
		return (
			<div>
				<br />
				<form onSubmit={this.addList}>
					<label>
						Add new list:
						<input type="text" name="title" placeholder="List title" />
					</label>
					<input type="submit" value="Submit" />
				</form>
				<h3>Please see your lists below.</h3>
				<div className="list-container" onClick={this.handleDelete}>
					{this.renderLists()}
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	const { lists } = state;
	return { lists };
}

export default connect(mapStateToProps, {
	addList,
	deleteList,
})(Lists);
