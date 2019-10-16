import React, { Component } from 'react';
import Mainboard from '../components/MainBoard';

class ScribbleSpace extends Component {
  constructor(props) {
    super(props);
    this.makeRoom = this.makeRoom.bind(this);
  }

  // create new room
  makeRoom() {
    fetch('/scribbleSpace', {
      headers: { 'Content-type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({
        name: this.props.name,
        roomName: 'boots',
        password: 'cats',
        socketId: this.props.socketId
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
      });
  }

  render() {
    const makeRoom = (
      <div className='buttonContainer'>
        <input type='text' name='roomName' />
        <button className='canvasButtons' type='button' onClick={this.makeRoom}>
          <h6>Create Your Room</h6>
        </button>
      </div>
    );
    return <div>{makeRoom}</div>;
  }
}

export default ScribbleSpace;
