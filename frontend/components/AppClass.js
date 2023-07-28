import React from 'react'
import axios from 'axios'

const initialMessage = 'Coordinates (2, 2)'
const initialResponse = 'Waiting for move...'
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4
const URL = 'http://localhost:9000/api/result'

let xcoord = 2
let ycoord = 2
let movement = 0
let index = 4

export default class AppClass extends React.Component {
  state = {
    x: xcoord,
    y: ycoord,
    steps: initialSteps,
    email: initialEmail,
    message: initialMessage,
    response: initialResponse,
    index: initialIndex
  }
  
  reset = () => {
    this.setState({
      ...this.state,
      x: 2,
      y: 2,
      message: initialMessage,
      email: initialEmail,
      steps: initialSteps,
      response: initialResponse,
      index: initialIndex
    })
  }

  getXY = (press) => {
    //Left
    if(press === 1 && ycoord - 1 > 0) ycoord -= 1;
    //Up
    else if(press === 2 && xcoord - 1 > 0) xcoord -= 1;
    //Right
    else if(press === 3 && ycoord + 1 < 4) ycoord += 1;
    //Down
    else if(press === 4 && xcoord + 1 < 4) xcoord += 1;
    
    // this.setState({...this.state, x: xcoord, y: ycoord})
    this.getNextIndex(press)

    //changing x and y coords in state doesn't work
  }

  getNextIndex = (direction) => {
    //Left
    if(direction === 1 && index > 0) {
      index -= 1;
      movement += 1
    }
    //Up
    else if(direction === 2 && index - 3 >= 0) {
      index -= 3;
      movement += 3
    }
    //Right
    else if(direction === 3 && index < 8) {
      index += 1;
      movement += 1
    }
    //Down
    else if(direction === 4 && index + 3 <= 8) {
      index += 3;
      movement += 3
    }

    if(index === 2) {
      xcoord = 1
      ycoord = 3
    } else if(index === 3) {
      xcoord = 2
      ycoord = 1
    } else if(index === 5) {
      xcoord = 2
      ycoord = 3
    } else if(index === 6) {
      xcoord = 3
      ycoord = 1
    }
  
    this.move(direction)
  }

  move = () => {
    this.setState({...this.state, x: xcoord, y: ycoord, message: `Coordinates (${xcoord}, ${ycoord})`, steps: movement, index: index})
    return movement

    //movement works, logging it doesn't work
  }

  onChange = (evt) => {
    this.setState({...this.state, email: evt.target.value})

    //works
  }

  onSubmit = (evt) => {
    evt.preventDefault()
    axios.post(URL, this.state)
      .then(res => {
        this.setState({...this.state, response: res.data.message})
        reset()
      })
      .catch(err => {
        this.setState({...this.state, response: err.response.data.message})
      })

    //works
  }

  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">{this.state.message}</h3>
          <h3 id="steps">You moved {this.state.steps} times</h3>
        </div>
        <div id="grid">
          {
            [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
              <div key={idx} className={`square${idx === this.state.index ? ' active' : ''}`}>
                {idx === this.state.index ? 'B' : null}
              </div>
            ))
          }
        </div>
        <div className="info">
          <h3 id="message">{this.state.response}</h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={() => {this.getXY(1)}}>LEFT</button>
          <button id="up" onClick={() => {this.getXY(2)}}>UP</button>
          <button id="right" onClick={() => {this.getXY(3)}}>RIGHT</button>
          <button id="down" onClick={() => {this.getXY(4)}}>DOWN</button>
          <button id="reset" onClick={() => {this.reset()}}>reset</button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input id="email" type="email" placeholder="type email" onChange={this.onChange} value={this.state.email}></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
