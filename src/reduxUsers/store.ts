import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './reducers';
// import thunk from 'redux-thunk';
// import authReducer from './slices/authSlice';

const setupStore = () => {
  return configureStore({
    // devTools: process.env.NODE_ENV !== 'production',
    reducer: rootReducer,
    // middleware: [thunk],
  });
};

const store = setupStore();
const getState = store.getState;
export type RootStateForSlice = ReturnType<typeof getState>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
export default store;
