//----------------------------- Importing required libaries ---------------------------//
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from "react-redux";
import { store } from "./store";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    {/* rendering the components */}
    <Provider store = {store} >
      <ToastContainer />
        <App />
    </Provider>
  </React.StrictMode>
);