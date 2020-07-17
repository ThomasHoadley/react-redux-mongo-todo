export const ADD_LIST = "ADD_LIST";
export const DELETE_LIST = "DELETE_LIST";
export const GET_LIST = "GET_LIST";
export const ADD_LIST_ITEM = "ADD_LIST_ITEM";

export function addList(title) {
	return { type: ADD_LIST, title };
}

export function deleteList(id) {
	return { type: DELETE_LIST, id };
}

export function addListItem(listItem) {
	return { type: ADD_LIST_ITEM, listItem };
}
