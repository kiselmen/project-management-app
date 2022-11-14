import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { Header } from '..';

import store from '../../reduxUsers/store';
import Routing from './Routing';

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <Header />
        <Routing />
      </HashRouter>
    </Provider>
  );
}

export default App;
