import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from '@state/';
import theme from '@global/theme';

ReactDOM.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </ReduxProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
