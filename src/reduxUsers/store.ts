import { configureStore } from '@reduxjs/toolkit';
import cardsReducer from 'reducers';
import thunk from 'redux-thunk';
import { initialState } from '../reducers/reducer';

const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: cardsReducer,
  middleware: [thunk],
  preloadedState: initialState,
});

export default store;
