// Can go OOB
// Error messages don't accurately show
// Active square can wrap

import React, { useState } from 'react'
import axios from 'axios'

const initialMessage = '(2, 2)'
const initialResponse = ''
const initialSteps = 0
const initialIndex = 4
const initialState = {
  x: 2,
  y: 2,
  steps: 0,
  email: ''
}
const URL = 'http://localhost:9000/api/result'
let xcoord = 2
let ycoord = 2
let xfake = 2
let yfake = 2

export default function AppFunctional(props) {

  const [message, setMessage] = useState(initialMessage)
  const [index, setIndex] = useState(initialIndex)
  const [movement, setMovement] = useState(initialSteps)
  const [state, setState] = useState(initialState)
  const [response, setResponse] = useState(initialResponse)

  function getXY(press) {
    setResponse(initialResponse)
    //Left
    if(press === 1 && ycoord - 1 > 0) {
      ycoord -= 1;
      setResponse(initialResponse)
    }
    //Up
    else if(press === 2 && xcoord - 1 > 0) {
      xcoord -= 1;
      setResponse(initialResponse)
    }
    //Right
    else if(press === 3 && ycoord + 1 < 4) {
      ycoord += 1;
      setResponse(initialResponse)
    }
    //Down
    else if(press === 4 && xcoord + 1 < 4) {
      xcoord += 1;
      setResponse(initialResponse)
    }

    if(press === 1) yfake -= 1;
    else if(press === 2) xfake -= 1
    else if(press === 3) yfake += 1
    else if(press === 4) xfake += 1


    if(press === 1 && yfake <= 0) {
      setResponse("You can't go up")
      yfake = ycoord
    }
    else if(press === 2 && xfake <= 0) {
      setResponse("You can't go left")
      xfake = xcoord
    }
    else if(press === 3 && yfake >= 4) {
      setResponse("You can't go down")
      yfake = ycoord
    }
    else if(press === 4 && xfake >= 4) {
      setResponse("You can't go right")
      xfake = xcoord
    }
    
    getNextIndex(press)
  }

  function getXYMessage(press) {
    getXY(press)
  }

  function reset() {
    xcoord = 2;
    ycoord = 2;
    setMessage(initialMessage);
    setIndex(initialIndex);
    setState(initialState)
    setMovement(initialSteps)
    setResponse(initialResponse)
  }

  function getNextIndex(direction) {

    const changes = [
      [0, -1], // Left
      [-1, 0], // Up
      [0, 1], // Right
      [1, 0], // Down
    ];

    const [dx, dy] = changes[direction - 1];
    const nextIndex = index + dx + (dy * 3);

    const coordinatesMap = {
      2: { x: 3, y: 1 },
      3: { x: 1, y: 2 },
      5: { x: 3, y: 2 },
      6: { x: 1, y: 3 },
    };

    const { x, y } = coordinatesMap[nextIndex] || {};
    setState((prevState) => ({
      ...prevState,
      x: x || prevState.x,
      y: y || prevState.y,
    }));
    setIndex(nextIndex);

    move(direction)
  }

  function move() {
    setMessage(`(${xcoord}, ${ycoord})`)
    setState({...state, x: xcoord, y: ycoord, steps: movement})
  }

  function onChange(evt) {
    setState({...state, email: evt.target.value})
  }

  function onSubmit(evt) {
    evt.preventDefault()
    axios.post(URL, state)
      .then(res => {
        setResponse(res.data.message)
        xcoord = 2;
        ycoord = 2;
        setMessage(initialMessage);
        setIndex(initialIndex);
        setState(initialState)
        setMovement(initialSteps)
      })
      .catch(err => {
        setResponse(err.response.data.message)
        setState({...state, email: ''})
      })
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates {message}</h3>
        <h3 id="steps">You moved {movement} {movement !== 1 ? `times` : `time`}</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === index ? ' active' : ''}`}>
              {idx === index ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message">{response}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={() => {getXYMessage(2)}}>LEFT</button>
        <button id="up" onClick={() => {getXYMessage(1)}}>UP</button>
        <button id="right" onClick={() => {getXYMessage(4)}}>RIGHT</button>
        <button id="down" onClick={() => {getXYMessage(3)}}>DOWN</button>
        <button id="reset" onClick={() => {reset()}}>reset</button>
      </div>
      <form onSubmit={onSubmit}>
        <input id="email" type="email" placeholder="type email" onChange={onChange} value = {state.email}></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}