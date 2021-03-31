import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './theme';
import Header from './components/Header';
import Gallery from './components/Gallery';
import simpleDetectMobileBrowser from './utils/simpleDetectMobileBrowser';
import Carousel from './components/Carousel';
import { CarouselModalProvider } from './contexts/CarouselModalContext';

window.isMobileBrowser = simpleDetectMobileBrowser();

function App() {
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Header />
        <CarouselModalProvider>
          <Gallery />
          <Carousel />
        </CarouselModalProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
