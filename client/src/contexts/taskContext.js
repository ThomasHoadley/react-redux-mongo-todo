import React, { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uui } from "uuid";

import { toIdMap } from "../common/toIdMap";

export const TasksAndListsContext = React.createContext({});

export const TasksAndListsProvider = (props) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lists, setLists] = useState(
    JSON.parse(localStorage.getItem("lists")) || {}
  );
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || {}
  );

  useEffect(() => {
    const getData = async (endpoint) => {
      try {
        const { data } = await axios.get(endpoint);
        return toIdMap(data.items);
      } catch (error) {
        console.log('error', error)
        setError(error);
        setLoading(false);
      }
    };

    const getBoth = async () => {
      const listsFromApi = await getData("/api/lists");
      const tasksFromApi = await getData("/api/tasks");

      return {
        listsFromApi,
        tasksFromApi,
      };
    };

    const fetchState = async () => {
      const listsAndTasks = await getBoth();

      setLoading(false);
      setLists({
        ...lists,
        ...listsAndTasks.listsFromApi
      });
      setTasks({
        ...tasks,
        ...listsAndTasks.tasksFromApi
      });
    };

    fetchState();
  }, []);

  function addList(listItem) {
    const newID = uui();

    const updatedLists = {
      ...lists,
      [newID]: {
        id: newID,
        title: listItem,
        tasks: [],
      },
    };

    setLists(updatedLists);
    localStorage.setItem("lists", JSON.stringify(updatedLists));

    // We want to redirect after state has been set here.
    // but it needs to be async.
  }

  function deleteList(listKey) {
    let updatedLists = {
      ...lists,
    };
    let updatedTasks = {
      ...tasks,
    };

    const listTasks = lists[listKey].tasks;

    // TODO: Check immutability / best way of doing this?
    listTasks.map((listTask) => {
      delete tasks[listTask];
    });
    // Delete the list
    delete updatedLists[listKey];

    setTasks(updatedTasks);
    setLists(updatedLists);

    localStorage.setItem("lists", JSON.stringify(updatedLists));
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  }

  function addListTask(listId, newTask) {
    const randomTaskId = uui();

    const updatedTasks = {
      ...tasks,
      [randomTaskId]: {
        id: randomTaskId,
        text: newTask,
        complete: false,
      },
    };

    const updatedLists = {
      ...lists,
      [listId]: {
        ...lists[listId],
        tasks: [...lists[listId].tasks, randomTaskId],
      },
    };

    setTasks(updatedTasks);
    setLists(updatedLists);
    localStorage.setItem("lists", JSON.stringify(updatedLists));
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  }

  function toggleTask(taskID) {
    const updatedTasks = {
      ...tasks,
      [taskID]: {
        ...tasks[taskID],
        complete: !tasks[taskID].complete,
      },
    };
    setTasks(updatedTasks);

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  }

  function deleteTask(listId, taskID) {
    const updatedTasks = {
      ...tasks,
    };

    const updatedLists = {
      ...lists,
      [listId]: {
        ...lists[listId],
        tasks: lists[listId].tasks.filter((id) => id !== taskID),
      },
    };

    delete updatedTasks[taskID];

    setTasks(updatedTasks);
    setLists(updatedLists);
  }

  return (
    <TasksAndListsContext.Provider
      {...props}
      value={{
        // Methods
        addList,
        addListTask,
        toggleTask,
        deleteList,
        deleteTask,
        // Data
        error,
        loading,
        lists,
        tasks,
      }}
    />
  );
};
