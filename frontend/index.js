import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, NavLink, Routes, Route } from 'react-router-dom'
import AppClass from './components/AppClass'
import AppFunctional from './components/AppFunctional'
import './styles/reset.css'
import './styles/styles.css'

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
  <BrowserRouter>
    <h1>Welcome to the GRID</h1>
    <nav>
      <NavLink to="/">Functional</NavLink>
      <NavLink to="/class-based">Class-Based</NavLink>
    </nav>
    <Routes>
      <Route path="/" element={<AppFunctional className="functional" />} />
      <Route path="class-based" element={<AppClass className="class-based" />} />
    </Routes>
  </BrowserRouter>
)

//Failing tests:
  // Name success message number is off
  // Movement calculator is sometimes off
  // OOB messages sometimes don't show up or show up when they shouldn't
  // Coordinates are sometimes off
  // Active square is sometimes in the wrong place with the following actions:
    // Down down left left
    // Right down down
    // Right down
    // Right right
    // Up right right

  // Possible fix for active square failure and movement caluclator failure:
    // Fix movement pattern -- active square sometimes gets caught up on a square where it shouldn't be caught up at
  // Possible fix for OOB messages:
    // Prevent active square from wrapping around the grid
  // Possible fix for name success message number:
    // Unsure




