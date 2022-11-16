import React from 'react';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { BackToTop, Header } from '..';

import store from '../../reduxUsers/store';
import Routing from './Routing';
import { Footer } from '../footer/Footer';
import { MainContainer } from './App.styles';

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <Header />
        {/* TODO replace id to pages */}
        <div id="back-to-top-anchor"></div>
        <MainContainer>
          <Routing />
        </MainContainer>
        <BackToTop />
        <Footer />
      </HashRouter>
    </Provider>
  );
}

export default App;
