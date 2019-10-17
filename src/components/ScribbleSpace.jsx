import React, { Component } from 'react';
import Mainboard from './MainBoard';
const io = require('socket.io-client');
const socket = io();

class ScribbleSpace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      roomName: null,
      password: null,
      loggedin: false,
      socketId: null,
      data: null
    };
    this.makeRoom = this.makeRoom.bind(this);
    this.handleChangeRoomName = this.handleChangeRoomName.bind(this);
  }

  handleChangeRoomName(event) {
    console.log(event, 'EVENT TARGET', event.target.value);
    this.setState({ roomName: event.target.value });
  }

  // create new room
  makeRoom() {
    fetch('/scribbleSpace', {
      headers: { 'Content-type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({
        username: 'boots',
        roomName: this.state.roomName,
        password: 'cats',
        socketId: this.state.socketId || 'scribbledSockedId'
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === 'available') {
          console.log('room created');
          this.setState({ loggedin: true });
          window.location = `/room/${this.state.roomName}`;
        }
      });
  }

  render() {
    const makeRoom = (
      <div className='buttonContainer'>
        <input
          type='text'
          name='roomName'
          onChange={this.handleChangeRoomName}
        />
        <button className='canvasButtons' type='button' onClick={this.makeRoom}>
          <h6>Create Your Room</h6>
        </button>
      </div>
    );
    return <div>{makeRoom}</div>;
  }
}

export default ScribbleSpace;
