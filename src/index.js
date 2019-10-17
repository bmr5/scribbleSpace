import React from 'react';
import ReactDOM from 'react-dom';
import Styles from './styles.css';
// import App from './App.jsx';
import WebApp from './WebApp.jsx';

const Scribble = () => (
  <div>
    <WebApp />
  </div>
);

ReactDOM.render(<Scribble />, document.getElementById('root'));
