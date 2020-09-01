import React from "react";

function Task(props) {
  return (
    <div>
      <p className={`${props.complete ? 'complete' : ''}`}>
        {props.taskText}
        <button onClick={props.onComplete}>Complete</button>
        <button onClick={props.onDelete}>Delete</button>
      </p>
    </div >
  )
}

export default Task;
