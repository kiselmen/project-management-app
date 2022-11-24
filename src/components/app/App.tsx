import React from 'react';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { BackToTop, Header } from '..';

import store from '../../reduxUsers/store';
import Routing from './Routing';
import ModalWindow from '../modal';
import { Footer } from '../footer/Footer';
import { MainContainer } from './App.styles';
import theme from '../themeProvider/theme';
import { ThemeProvider } from '@mui/material/styles';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <HashRouter>
          <ModalWindow />
          <Header />
          <div id="back-to-top-anchor"></div>
          <MainContainer>
            <Routing />
          </MainContainer>
          <Footer />
          <BackToTop />
        </HashRouter>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
