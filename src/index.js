import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Dashboard from './Dashboard';

const getState = () =>  JSON.parse(localStorage.getItem('state')) || undefined;

const updateState = state => localStorage.setItem('state', JSON.stringify(state));

ReactDOM.render(
  <React.StrictMode>
    <Dashboard state={getState()} updateState={updateState}/>
  </React.StrictMode>,
  document.getElementById('root')
);