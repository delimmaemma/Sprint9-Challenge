import React, { useState } from 'react';
import axios from 'axios';

const initialMessage = '(2, 2)';
const initialResponse = '';
const initialEmail = '';
const initialSteps = 0;
const initialIndex = 4;
const URL = 'http://localhost:9000/api/result';

const AppFunctional = ({ className }) => {
  const [x, setX] = useState(2);
  const [y, setY] = useState(2);
  const [steps, setSteps] = useState(initialSteps);
  const [email, setEmail] = useState(initialEmail);
  const [message, setMessage] = useState(initialMessage);
  const [response, setResponse] = useState(initialResponse);
  const [index, setIndex] = useState(initialIndex);

  const reset = () => {
    setX(2);
    setY(2);
    setMessage(initialMessage);
    setEmail(initialEmail);
    setSteps(initialSteps);
    setIndex(initialIndex);
    setResponse(initialResponse);
  };

  const getXY = (press) => {
    setResponse(initialResponse);
    const changes = [
      [0, -1], // Left
      [-1, 0], // Up
      [0, 1],  // Right
      [1, 0],  // Down
    ];

    const [dx, dy] = changes[press - 1];
    const yfake = y + dy;
    const xfake = x + dx;

    let response = initialResponse;
    if (yfake <= 0) {
      response = "You can't go up";
    } else if (xfake <= 0) {
      response = "You can't go left";
    } else if (yfake >= 4) {
      response = "You can't go down";
    } else if (xfake >= 4) {
      response = "You can't go right";
    }

    if (response === initialResponse) {
      setX((prevX) => prevX + dx);
      setY((prevY) => prevY + dy);
      setResponse(initialResponse);
      getNextIndex(press);
    } else {
      setResponse(response);
    }
  };

  const getNextIndex = (direction) => {
    const changes = [
      [0, -1], // Left
      [-1, 0], // Up
      [0, 1],  // Right
      [1, 0],  // Down
    ];
  
    const [dx, dy] = changes[direction - 1];
    const nextX = x + dx;
    const nextY = y + dy;
  
    if (nextX >= 1 && nextX <= 3 && nextY >= 1 && nextY <= 3) {
      setX(nextX);
      setY(nextY);
      setIndex(index + (dx + dy * 3));
      move();
    }
  };

  const move = () => {
    setSteps((prevSteps) => prevSteps + 1);
  };

  const onChange = (evt) => {
    setEmail(evt.target.value);
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    axios.post(URL, { x, y, steps, email })
      .then((res) => {
        setResponse(res.data.message);
        setX(2);
        setY(2);
        setMessage(initialMessage);
        setEmail(initialEmail);
        setSteps(initialSteps);
        setIndex(initialIndex);
      })
      .catch((err) => {
        setEmail('');
        setResponse(err.response.data.message);
      });
  };

  return (
    <div id="wrapper" className={className}>
      <div className="info">
        <h3 id="coordinates">Coordinates ({y}, {x})</h3>
        <h3 id="steps">You moved {steps} {steps !== 1 ? `times` : `time`}</h3>
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
        <button id="left" onClick={() => { getXY(2) }}>LEFT</button>
        <button id="up" onClick={() => { getXY(1) }}>UP</button>
        <button id="right" onClick={() => { getXY(4) }}>RIGHT</button>
        <button id="down" onClick={() => { getXY(3) }}>DOWN</button>
        <button id="reset" onClick={() => { reset() }}>reset</button>
      </div>
      <form onSubmit={onSubmit}>
        <input id="email" type="email" placeholder="type email" onChange={onChange} value={email}></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  );
};

export default AppFunctional;
