// Can go OOB on every square

import React, { useState } from 'react';
import axios from 'axios';

const initialMessage = '(2, 2)';
const initialEmail = '';
const initialResponse = '';
const initialSteps = 0;
const initialIndex = 4;
const initialState = {
  x: 2,
  y: 2,
  steps: 0,
  email: '',
};
const URL = 'http://localhost:9000/api/result';

export default function AppFunctional(props) {
  const [message, setMessage] = useState(initialMessage);
  const [index, setIndex] = useState(initialIndex);
  const [movement, setMovement] = useState(initialSteps);
  const [state, setState] = useState(initialState);
  const [response, setResponse] = useState(initialResponse);

  const getXY = (press) => {
    setResponse(initialResponse);
    let yfake = state.y;
    let xfake = state.x;

    //Left
    if (press === 1 && state.y - 1 > 0) {
      yfake -= 1;
    }
    //Up
    else if (press === 2 && state.x - 1 > 0) {
      xfake -= 1;
    }
    //Right
    else if (press === 3 && state.y + 1 < 4) {
      yfake += 1;
    }
    //Down
    else if (press === 4 && state.x + 1 < 4) {
      xfake += 1;
    }

    if (press === 1 && yfake <= 0) {
      setResponse("You can't go up");
      yfake = state.y;
    } else if (press === 2 && xfake <= 0) {
      setResponse("You can't go left");
      xfake = state.x;
    } else if (press === 3 && yfake >= 4) {
      setResponse("You can't go down");
      yfake = state.y;
    } else if (press === 4 && xfake >= 4) {
      setResponse("You can't go right");
      xfake = state.x;
    }

    setNextIndex(press);
  };

  const reset = () => {
    setState(initialState);
    setMessage(initialMessage);
    setIndex(initialIndex);
    setMovement(initialSteps);
  };

  const setNextIndex = (direction) => {
    const changes = [
      [0, -1], // Left
      [-1, 0], // Up
      [0, 1], // Right
      [1, 0], // Down
    ];

    const [dx, dy] = changes[direction - 1];
    const nextIndex = index + dx + dy * 3;

    const coordinatesMap = {
      2: { x: 1, y: 3 },
      3: { x: 2, y: 1 },
      5: { x: 2, y: 3 },
      6: { x: 3, y: 1 },
    };

    const { x, y } = coordinatesMap[nextIndex] || {};
    setState((prevState) => ({
      ...prevState,
      x: x || prevState.x,
      y: y || prevState.y,
    }));
    setIndex(nextIndex);
    move();
  };

  const move = () => {
    setMessage(`(${state.x}, ${state.y})`);
    setMovement((prevMovement) => prevMovement + 1);
  };

  const onChange = (evt) => {
    setState({ ...state, email: evt.target.value });
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    axios
      .post(URL, state)
      .then((res) => {
        setResponse(res.data.message);
        reset();
      })
      .catch((err) => {
        setResponse(err.response.data.message);
        setState({ ...state, email: '' });
      });
  };

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates {message}</h3>
        <h3 id="steps">You moved {movement} times</h3>
      </div>
      <div id="grid">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
          <div key={idx} className={`square${idx === index ? ' active' : ''}`}>
            {idx === index ? 'B' : null}
          </div>
        ))}
      </div>
      <div className="info">
        <h3 id="message">{response}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={() => getXY(2)}>LEFT</button>
        <button id="up" onClick={() => getXY(1)}>UP</button>
        <button id="right" onClick={() => getXY(4)}>RIGHT</button>
        <button id="down" onClick={() => getXY(3)}>DOWN</button>
        <button id="reset" onClick={reset}>reset</button>
      </div>
      <form onSubmit={onSubmit}>
        <input id="email" type="email" placeholder="type email" onChange={onChange} value={state.email}></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  );
}
