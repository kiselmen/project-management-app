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
          <Container
            sx={{
              padding: { xs: 0, md: 0 },
              minHeight: {
                xs: 'calc(100vh - 152px)',
                sm: 'calc(100vh - 106px)',
                md: 'calc(100vh - 110px)',
              },
              overflow: 'auto',
            }}
          >
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
