import React from 'react';
import ReactDOM from 'react-dom';
import Styles from './styles.css';
// import App from './App.jsx';
import TextApp from './TextApp.jsx';
import CanvasApp from './CanvasApp.jsx'

const Scribble = () => (
  <div>
    <CanvasApp />
  </div>
);

ReactDOM.render(<Scribble />, document.getElementById('root'));
