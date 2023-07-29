// Write your tests here
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import AppFunctional from './AppFunctional';

test('App Class Renders', () => {
  render(<AppFunctional />)
})
test('Nav links are present', () => {
  render(<AppFunctional />)
  const nav = screen.queryAllByRole('nav')
  expect(nav).toBeTruthy()
})
test('Header is present', () => {
  render(<AppFunctional />)
  const header = screen.queryByText(/Coordinates/i)
  expect(header).toBeTruthy()
})
test('Buttons are present', () => {
  render(<AppFunctional />)
  const buttons = screen.queryAllByRole('button')
  expect(buttons).toHaveLength(6)
})
test('Movement and Coordinate message is present', () => {
  render(<AppFunctional />)
  const coordinates = screen.queryByText(/Coordinates/i)
  const movement = screen.queryByText(/Movement/i)
  expect(coordinates).toBeTruthy()
  expect(movement).toBeTruthy()
})
