// Can't go up from idx 3 to idx 0
// Can't go down from idx 5 to idx 8
// Can't go right from idx 6 to idx 7
// Can't go left from idx 2 to idx 1
// Can go OOB from idx 2 to idx -1
// Can go OOB from idx 6 to idx 9

import React from 'react';
import axios from 'axios';

const initialMessage = '(2, 2)';
const initialResponse = '';
const initialEmail = '';
const initialSteps = 0;
const initialIndex = 4;
const URL = 'http://localhost:9000/api/result';

export default class AppClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 2,
      y: 2,
      steps: initialSteps,
      email: initialEmail,
      message: initialMessage,
      response: initialResponse,
      index: initialIndex,
    };
  }

  reset = () => {
    this.setState({
      x: 2,
      y: 2,
      message: initialMessage,
      email: initialEmail,
      steps: initialSteps,
      index: initialIndex,
      response: initialResponse
    });
  };

  getXY = (press) => {
    this.setState({ response: initialResponse});
    const { x, y, index } = this.state;
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
      this.setState((prevState) => ({
        x: prevState.x + dx,
        y: prevState.y + dy,
        response: initialResponse,
      }));
      this.getNextIndex(press);
    } else {
      this.setState({ response });
    }
  };

  getNextIndex = (direction) => {
    const { index } = this.state;
    const changes = [
      [0, -1], // Left
      [-1, 0], // Up
      [0, 1],  // Right
      [1, 0],  // Down
    ];

    const [dx, dy] = changes[direction - 1];
    const nextIndex = index + (dx + dy * 3);

    const coordinatesMap = {
      2: { x: 1, y: 3 },
      3: { x: 2, y: 1 },
      5: { x: 2, y: 3 },
      6: { x: 3, y: 1 },
    };

    this.setState((prevState) => ({
      x: coordinatesMap[nextIndex]?.x || prevState.x,
      y: coordinatesMap[nextIndex]?.y || prevState.y,
      index: nextIndex,
    }));

    this.move();
  };

  move = () => {
    this.setState((prevState) => ({
      steps: prevState.steps + 1,
      message: `(${prevState.y}, ${prevState.x})`,
    }));
  };

  onChange = (evt) => {
    this.setState({ email: evt.target.value });
  };

  onSubmit = (evt) => {
    evt.preventDefault();
    axios.post(URL, this.state)
      .then((res) => {
        this.setState({ response: res.data.message });
        this.setState({
          x: 2,
          y: 2,
          message: initialMessage,
          email: initialEmail,
          steps: initialSteps,
          index: initialIndex,
        });
      })
      .catch((err) => {
        this.setState({ email: '', response: err.response.data.message });
      });
  };

  render() {
    const { className } = this.props;
    const { x, y, steps, response, index } = this.state;

    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates ({x}, {y})</h3>
          <h3 id="steps">You moved {steps} times</h3>
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
          <button id="left" onClick={() => { this.getXY(2) }}>LEFT</button>
          <button id="up" onClick={() => { this.getXY(1) }}>UP</button>
          <button id="right" onClick={() => { this.getXY(4) }}>RIGHT</button>
          <button id="down" onClick={() => { this.getXY(3) }}>DOWN</button>
          <button id="reset" onClick={() => { this.reset() }}>reset</button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input id="email" type="email" placeholder="type email" onChange={this.onChange} value={this.state.email}></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    );
  }
}
