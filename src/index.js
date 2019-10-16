import React from 'react';
import ReactDOM from 'react-dom';
import Styles from './styles.css';
import App from './App.jsx';

const Scibble = () => (
  <div>
    <h1 className='logoMain'>scribbleSpace</h1>
    <App />
  </div>
);

ReactDOM.render(<Scibble />, document.getElementById('root'));
