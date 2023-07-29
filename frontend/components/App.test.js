// Write your tests here
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AppFunctional from './AppFunctional';

test('App Class Renders', () => {
  render(<AppFunctional />)
})
test('Nav links are present', () => {
  render(<AppFunctional />)
  const nav = screen.queryAllByRole('nav')
  expect(nav).toBeTruthy()
})
test('Coordinates are present', () => {
  render(<AppFunctional />)
  const header = screen.queryByText(/Coordinates/i)
  expect(header).toBeTruthy()
})
test('Buttons are present', () => {
  render(<AppFunctional />)
  const buttons = screen.queryAllByRole('button')
  expect(buttons).toHaveLength(6)
})
test('Movement is present', () => {
  render(<AppFunctional />)
  const movement = screen.queryByText(/You moved/i)
  expect(movement).toBeTruthy()
})
