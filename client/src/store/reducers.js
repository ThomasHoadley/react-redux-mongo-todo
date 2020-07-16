import { ADD_LIST } from "./actions";

const initialState = {
	lists: [
		{
			id: 1,
			title: "Shopping List",
			list: [
				{ id: 1, listItem: "Eggs" },
				{ id: 2, listItem: "Cheese" },
				{ id: 3, listItem: "Milk" },
			],
		},
		{
			id: 1,
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
						id: 4,
						title: action.title,
						list: [
							{ id: 1, listItem: "Cycle" },
							{ id: 2, listItem: "Arms Workout" },
							{ id: 3, listItem: "Chest Workout" },
						],
					},
				],
			});
		default:
			return state;
	}
}

export default listsApp;
