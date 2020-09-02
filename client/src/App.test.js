import React from 'react';
import axios from "axios";
import { act, fireEvent, render, wait } from '@testing-library/react';
import App from './App';
import listState from './state/listsState'

jest.mock('axios');

const task1 = "Buy coffee"
const task2 = "File taxes"

const mockAPIResponse = {
  data: {
    items: [
      {
        id: 'UYsd6ftasfd6sfydtgh',
        title: task1,
        tasks: []
      },
      {
        id: 'yuGASdgyasdasdvsaudyg',
        title: task2,
        tasks: []
      }
    ],
    count: 10
  }
}

// console.log(axios)

// it('renders learn react link', () => {
//   const { getByText } = render(<App />);
//   const title = getByText(/Todo list manager/i);
//   expect(title).toBeInTheDocument();
// });

it('allows users to add a new list', async () => {
  axios.get.mockResolvedValue(mockAPIResponse)

  const newTask = 'Do homework'
  const { queryByText, getByLabelText } = render(<App />);

  const input = getByLabelText('Add a list')
  const button = queryByText('Add list')

  expect(input).toBeInTheDocument()
  expect(button).toBeInTheDocument()
  expect(queryByText(newTask)).not.toBeInTheDocument()

  await wait(() => {
    fireEvent.change(input, { target: { value: newTask } })
    fireEvent.click(button)
  })

  expect(queryByText(task1)).toBeInTheDocument()
  expect(queryByText(task2)).toBeInTheDocument()
  expect(queryByText(newTask)).toBeInTheDocument()
})