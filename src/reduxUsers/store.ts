import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './reducers';
// import thunk from 'redux-thunk';

const setupStore = () => {
  return configureStore({
    devTools: process.env.NODE_ENV !== 'production',
    reducer: {
      rootReducer: rootReducer,
    },
    // middleware: [thunk],
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
export default setupStore;
