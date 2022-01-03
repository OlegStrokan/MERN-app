import React from 'react';
import ReactDOM from 'react-dom';
import {App} from "./App";
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import { theme } from './theme';

ReactDOM.render(
<BrowserRouter>
    <ThemeProvider theme={theme}>
    <App />
    </ThemeProvider>
</BrowserRouter>,
  document.getElementById('root')
);

