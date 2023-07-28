// Write your tests here
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import AppClass from './AppClass';

test('sanity', () => {
  expect(true).toBe(true)
})
test('App Class Renders', () => {
  render(<AppClass />)
})
test('Nav links are present', () => {
  render(<AppClass />)
  const nav1 = screen.queryByText(/Functional/i)
  const nav2 = screen.queryByText(/Class-Based/i)
  expect(nav1).toBeInTheDocument()
  expect(nav2).toBeInTheDocument()
})
test('Header is present', () => {
  render(<AppClass />)
  const header = screen.queryByText(/Welcome to the GRID/i)
  expect(header).toBeInTheDocument()
})
// test('Coordinates go down when left button is clicked', () => {
//   render(<AppClass />)
//   const left = screen.queryByText(/left/i)
//   const coordinates = screen.queryByText(/coordinates (2, 2)/i)
//   expect(coordinates).toHaveTextContent(/coordinates (2, 2)/i)
//   userEvent.click(left)
//   expect(coordinates).toHaveTextContent(/coordinates (1, 2)/i)
// })
// test('Coordinates go up when right button is clicked', () => {
//   render(<AppClass />)
//   const right = screen.queryByText(/right/i)
//   const coordinates = screen.queryByText(/coordinates (2, 2)/i)
//   expect(coordinates).toHaveTextContent(/coordinates (2, 2)/i)
//   userEvent.click(right)
//   expect(coordinates).toHaveTextContent(/coordinates (3, 2)/i)
// })
// test('Coordinates go up by three when down is clicked', () => {
//   render(<AppClass />)
//   const down = screen.queryByText(/down/i)
//   const coordinates = screen.queryByText(/coordinates (2, 2)/i)
//   expect(coordinates).toHaveTextContent(/coordinates (2, 2)/i)
//   userEvent.click(down)
//   expect(coordinates).toHaveTextContent(/coordinates (2, 3)/i)
// })
// test('Coordinates go down by three when up is clicked', () => {
//   render(<AppClass />)
//   const up = screen.queryByText(/up/i)
//   const coordinates = screen.queryByText(/coordinates (2, 2)/i)
//   expect(coordinates).toHaveTextContent(/coordinates (2, 2)/i)
//   userEvent.click(up)
//   expect(coordinates).toHaveTextContent(/coordinates (2, 1)/i)
// })
// test('Reset button works', () => {
//   render(<AppClass />)
//   const reset = screen.queryByText(/reset/i)
//   const up = screen.queryByText(/up/i)
//   const coordinates = screen.queryByText(/coordinates (2, 2)/i)
//   expect(coordinates).toHaveTextContent(/coordinates (2, 2)/i)
//   userEvent.click(up)
//   expect(coordinates).toHaveTextContent(/coordinates (2, 1)/i)
//   userEvent.click(reset)
//   expect(coordinates).toHaveTextContent(/coordinates (2, 2)/i)
// })
// test('Movement changes based upon button click', () => {
//   render(<AppClass />)
//   const up = screen.queryByText(/up/i)
//   const movement = screen.queryByText(/You moved 0 times/i)
//   const coordinates = screen.queryByText(/coordinates (2, 2)/i)
//   expect(coordinates).toHaveTextContent(/coordinates (2, 2)/i)
//   userEvent.click(up)
//   expect(coordinates).toHaveTextContent(/coordinates (2, 1)/i)
//   expect(movement).toHaveTextContent(/You moved 1 times/i)
// })
test('Response field is showing', () => {
  render(<AppClass />)
  const response = screen.queryByText(/Waiting for move.../i)
  expect(response).toBeInTheDocument()
})
test('Can input email', () => {
  render(<AppClass />)
  const email = screen.queryByPlaceholderText(/type email/i)
  userEvent.type(email, 'user@email.com')
  expect(email).toHaveTextContent('user@email.com')
})
