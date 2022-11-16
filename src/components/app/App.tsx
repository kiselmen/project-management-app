import React from 'react';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { BackToTop, Header } from '..';

import store from '../../reduxUsers/store';
import Routing from './Routing';
import ModalWindow from '../modal';

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <ModalWindow />
        <Header />
        {/* TODO replace id to pages */}
        <div id="back-to-top-anchor"></div>
        <Routing />
        <BackToTop />
      </HashRouter>
    </Provider>
  );
}

export default App;
