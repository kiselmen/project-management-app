import React from 'react';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { BackToTop, Header } from '..';

import store from '../../reduxUsers/store';
import Routing from './Routing';
import ModalWindow from '../modal';
import { Footer } from '../footer/Footer';
import theme from '../themeProvider/theme';
import { ThemeProvider } from '@mui/material/styles';
import { Container, CssBaseline } from '@mui/material';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <HashRouter>
          <ModalWindow />
          <Header />
          <Container>
            <Routing />
            <BackToTop />
          </Container>
          {/* <MainContainer> */}
          {/* <Routing />
          {/* </MainContainer> */}
          <Footer />
        </HashRouter>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
