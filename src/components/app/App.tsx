import React from 'react';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { BackToTop, Header } from '..';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

import theme from '../themeProvider/theme';

import store from '../../reduxUsers/store';

import Routing from '../routing/Routing';
import ModalWindow from '../modal';
import { Footer } from '../footer/Footer';
import StyledMuiContainerAppMain from './StyledMuiContainer';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <HashRouter>
          <ModalWindow />
          <Header />
          <StyledMuiContainerAppMain>
            <Routing />
            <BackToTop />
          </StyledMuiContainerAppMain>
          <Footer />
        </HashRouter>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
