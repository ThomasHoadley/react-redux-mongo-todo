import { ADD_LIST, DELETE_LIST } from "./actions";
import { v4 as uuidv4 } from "uuid";

const initialState = {
	lists: [
		{
			id: uuidv4(),
			title: "Shopping List",
			list: [
				{ id: 1, listItem: "Eggs" },
				{ id: 2, listItem: "Cheese" },
				{ id: 3, listItem: "Milk" },
			],
		},
		{
			id: uuidv4(),
			title: "Exercise",
			list: [
				{ id: 1, listItem: "Run" },
				{ id: 2, listItem: "Back workout" },
				{ id: 3, listItem: "Leg workout" },
			],
		},
	],
};

function listsApp(state = initialState, action) {
	switch (action.type) {
		case ADD_LIST:
			return Object.assign({}, state, {
				lists: [
					...state.lists,
					{
						id: uuidv4(),
						title: action.title,
						list: [
							{ id: 1, listItem: "Cycle" },
							{ id: 2, listItem: "Arms Workout" },
							{ id: 3, listItem: "Chest Workout" },
						],
					},
				],
			});
		case DELETE_LIST:
			return Object.assign({}, state, {
				lists: state.lists.filter((list) => {
					return list.id !== action.id;
				}),
			});
		default:
			return state;
	}
}

export default listsApp;
