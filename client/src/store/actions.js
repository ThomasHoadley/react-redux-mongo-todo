export const ADD_LIST = "ADD_LIST";
export const DELETE_LIST = "DELETE_LIST";
export const GET_LIST = "GET_LIST";

export function addList(title) {
	return { type: ADD_LIST, title };
}

export function deleteList(id) {
	return { type: DELETE_LIST, id };
}

export function getList(id) {
	return { type: GET_LIST, id };
}
