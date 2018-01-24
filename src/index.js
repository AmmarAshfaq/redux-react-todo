import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Route from './Route'
import registerServiceWorker from './registerServiceWorker';
import firebase from 'firebase';
  // Initialize Firebase
 
ReactDOM.render(<Route />, document.getElementById('root'));
registerServiceWorker();
