import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';



//axios.defaults.baseURL = 'http://0f29-103-76-141-168.ngrok.io';
// axios.defaults.baseURL = 'http://563e-103-76-141-168.ngrok.io';

//axios.defaults.baseURL = 'http://localhost:1337';
axios.defaults.baseURL = 'http://dentalhire.ca:1337';

//window.baseURL = "http://138.197.160.154:1337";
//window.baseURL = "http://localhost:1337";
window.baseURL = "http://dentalhire.ca:1337";

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  const authToken = localStorage.getItem('token');
  if (authToken) {
    config.headers.Authorization = 'Bearer ' + authToken;
  }

  return config;
});

axios.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response.status === 401) {
    //401 - unauthorized
    localStorage.clear();
    window.location.href = '/';
  }
  return error;
});



ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
