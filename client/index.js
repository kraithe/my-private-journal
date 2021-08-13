import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import './components/style.scss';

setTimeout(ReactDOM.render(<App />, document.getElementById('journal-app')), 5)