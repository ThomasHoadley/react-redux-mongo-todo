/** @jsx jsx */
import React from "react";
import styled from 'styled-components'
import { jsx } from '@emotion/core'

// This imports an object containing generated classnames.
import classes from './task.module.css'

const StyledP = styled.p`
  text-decoration: ${props => props.complete ? 'line-through' : 'auto'};
`

function Task(props) {
  return (
    <div>
      {/* Emotion */}
      <p css={{
        textDecoration: props.complete ? 'line-through' : 'auto',
      }}>
        {props.taskText}
      </p>

      {/* Styled components */}
      <StyledP complete={props.complete}>{props.taskText}</StyledP>

      {/* CSS Modules. You manually pass the className */}
      <p className={`${props.complete ? classes.complete : ''}`}>
        {props.taskText}
        <button onClick={props.onComplete}>Complete</button>
        <button onClick={props.onDelete}>Delete</button>
      </p>
    </div >
  )
}

export default Task;
