import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './reducers';
import thunk from 'redux-thunk';
import { createApiRequests } from './api/createApiRequests';

const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: {
    rootReducer: rootReducer,
    [createApiRequests.reducerPath]: createApiRequests.reducer,
  },
  middleware: [thunk],
});

export type AppDispatch = typeof store.dispatch;
export default store;
