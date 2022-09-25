import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/lab';
import { SnackbarProvider } from 'notistack';
import AdapterDateFns from '@date-io/date-fns';

import theme from './Theme';
import AppRouter from './Router';
import { AppProvider } from '../context';

import '../assets/styles/font.css';

const App = () => (
  <ThemeProvider theme={theme}>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <SnackbarProvider maxSnack={5}>
        <AppProvider>
          <CssBaseline />
          <AppRouter />
        </AppProvider>
      </SnackbarProvider>
    </LocalizationProvider>
  </ThemeProvider>
);

export default App;
