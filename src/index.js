import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import state from './state/state';

const appElement = document.getElementById('app');

ReactDOM.render(<App state={ state }/>, appElement);