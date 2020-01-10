import React, { Component } from 'react';
import CanvasDraw from 'react-canvas-draw';
<<<<<<< HEAD
import Styles from '../styles.css';

class MainBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.saveDrawingData = this.saveDrawingData.bind(this);
  }

  saveDrawingData(data) {
    fetch('/save', {
      headers: { 'Content-type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({ data: data, roomName: this.state.roomName }),
    });
=======
import OptionBar from './OptionBar';

// CanvasDraw imports the third party canvas npm package.
// ReadMe docs located in node packages react-canvas-draw info on modifying the canvas app.

class MainBoard extends Component {
  constructor(props) {
    super(props);
>>>>>>> dev
  }

  render() {
    return (
<<<<<<< HEAD
      <div className="mainCanvas">
        <CanvasDraw
          ref={canvasDraw => {
            this.saveableCanvas = canvasDraw;
          }}
          lazyRadius="1"
          brushRadius="4"
          canvasWidth="600px"
        />
        <br />
        <br />
        <button
          type="button"
          onClick={() => {
            this.saveDrawingData(this.saveableCanvas.getSaveData());
          }}
        >
          Save Me
        </button>
=======
      // <div>{this.props.match.params.name}</div>
      <div
        className='mainCanvas'
        onMouseUp={this.props.broadcastData}
        onTouchEnd={this.props.broadcastData}
      >
        <CanvasDraw
          ref={canvasDraw => {
            this.props.saveableCanvas = canvasDraw;
          }}
          saveData={this.props.data}
          lazyRadius='1'
          brushRadius='4'
          canvasWidth='800px'
          immediateLoading='true'
        />

        <OptionBar
          loadBoard={this.props.loadBoard}
          saveDrawingData={this.props.saveDrawingData}
          saveableCanvas={this.props.saveableCanvas}
          leaveRoom={this.props.leaveRoom}
        />
>>>>>>> dev
      </div>
    );
  }
}

export default MainBoard;
