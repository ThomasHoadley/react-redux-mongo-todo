import { useTasksAndLists } from "./useTasksAndLists"

// This custom hook make it easier to manage a single list.
export const useListTasks = (listId) => {
  // Use context data
  const { addListTask, deleteTask, lists, tasks } = useTasksAndLists()

  // Get one list
  const list = lists[listId]
  // TODO: add a useEffect here to redirect user if list is undefined
  // this can by using 2 other hooks inside this one (one from React, one from react-router-dom)
  // currently an error is thrown when this is undefined, because we try to added list.tasks below

  const getTitle = () => {
    if(!list || !list.title) return
    return list.title
  }

  // Get tasks for list
  const getTasks = () => {
    if (!list || !list.tasks) return []
    return list.tasks.map(id => tasks[id])
  }

  // Add a task to this list
  const addTaskToList = (newTask) => addListTask(list.id, newTask)

  // Remove a task from this list
  const removeTaskFromList = (taskId) => deleteTask(list.id, taskId)

  return {
    title: getTitle(),
    listTasks: getTasks(),
    addTaskToList,
    removeTaskFromList
  }
}
