import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDIsUlLNaabxbpUxjnCis3L0VtScFaxA28",
  authDomain: "cart-dbfe8.firebaseapp.com",
  projectId: "cart-dbfe8",
  storageBucket: "cart-dbfe8.appspot.com",
  messagingSenderId: "165673108103",
  appId: "1:165673108103:web:92e5dc62346c6d743eae22"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
  <App />
  </React.StrictMode>,
  document.getElementById('root')
);

