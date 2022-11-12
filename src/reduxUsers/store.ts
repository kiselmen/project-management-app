import { configureStore } from '@reduxjs/toolkit';
import { reducerIsLogging } from './reducers';
import thunk from 'redux-thunk';
import initialState from '../consts/initialState';

const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: reducerIsLogging,
  middleware: [thunk],
  preloadedState: initialState,
});

export default store;
