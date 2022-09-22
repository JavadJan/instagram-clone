import "./wdyr";
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import firebaseContext from './context/firebase';
import 'react-loading-skeleton/dist/skeleton.css'
import { db, auth } from './lib/firebase';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <firebaseContext.Provider value={{ db, auth }}>
    <App />
  </firebaseContext.Provider>
);


