import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './reducers';
import thunk from 'redux-thunk';

const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: rootReducer,
  middleware: [thunk],
});

export default store;
