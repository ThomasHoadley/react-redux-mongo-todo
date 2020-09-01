import { useContext } from 'react'
import { TasksAndListsContext } from '../contexts/taskContext'

export const useTasksAndLists = () => useContext(TasksAndListsContext)
