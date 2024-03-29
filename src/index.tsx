import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './app/App';
import './css/index.css';
import './css/App.css'
import { BrowserRouter as Router } from "react-router-dom"

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import theme from './app/MaterialTheme/index';
import { socketContext, socket } from "./app/Context/socket"

ReactDom.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <socketContext.Provider value={socket}>
            <App />
          </socketContext.Provider>
        </ThemeProvider>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
