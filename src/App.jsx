import React from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import CssBaseline from '@material-ui/core/CssBaseline';
import './App.css';
import theme from './theme';
import Gallery from './Gallery';

function App() {
  return (
    <>
      <CssBaseline />
      <MuiThemeProvider theme={theme}>
        <div>
          <Gallery />
        </div>
      </MuiThemeProvider>
    </>
  );
}

export default App;
