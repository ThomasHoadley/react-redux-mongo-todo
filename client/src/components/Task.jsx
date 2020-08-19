import React from "react";

const Task = (props) => {
  return (
    <div>
      <p className={`${props.complete ? 'complete' : ''}`}>
        {props.taskText}
        <button onClick={() => props.onToggleTask(props.taskID)}>Complete</button>
        <button onClick={() => props.onDeleteTask(props.listID, props.taskID)}>Delete</button>
      </p>
    </div >
  )
}

export default Task;
