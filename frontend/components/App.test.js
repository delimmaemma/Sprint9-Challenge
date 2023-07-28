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
test('Movement changes based upon button click', async () => {
  render(<AppFunctional />)
  const up = screen.queryByText(/up/i)
  userEvent.click(up)
  const movement = await screen.findByText(/You moved 1 times/i)
  expect(movement).toBeInTheDocument()
})
test('Can input email', async () => {
  render(<AppFunctional />)
  const email = screen.queryByPlaceholderText(/type email/i)
  userEvent.type(email, 'user@email.com')
  await waitFor(() => {
    const user = screen.queryByDisplayValue('user@email.com')
    expect(user).toBeInTheDocument()
  })
})
