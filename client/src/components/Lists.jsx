import React, { Component } from "react";
import { connect } from "react-redux";
import { addList, deleteList } from "../store/actions";
import { Link } from "react-router-dom";

class Lists extends Component {
	constructor(props) {
		super(props);
		this.handleAddList = this.handleAddList.bind(this);
		this.renderLists = this.renderLists.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
	}

  // Don't be afraid of inline event handlers
	handleAddList(e) {
		e.preventDefault();
		let listTitle = e.target.title.value;
		this.props.addList(listTitle);
		e.target.title.value = "";
	}

  // TODO: refactor to avoid attribute lookup
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
      // TODO: return directly, instead of mapping.
			lists.push(
        // TODO: unique keys
        // https://reactjs.org/docs/lists-and-keys.html
				<div className="list-item">
					<Link to={`/list/${id}`}>{title}</Link>
          {/* TODO: use a button */}
					<span className="delete-list" data-id={`${id}`}>
						X
					</span>
				</div>
			);
		});
		return lists;
	}

	render() {
		console.log(this.props)
		return (
			<div>
				<br />
				<form onSubmit={this.handleAddList}>
					<label>
						Add new list:
						<input type="text" name="title" placeholder="List title" />
					</label>
					<input type="submit" value="Submit" />
				</form>
				<h3>Please see your lists below.</h3>
        {/* TODO: use a button, not a div */}
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
