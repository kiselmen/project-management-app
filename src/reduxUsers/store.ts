import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './reducers';

const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

const store = setupStore();
const getState = store.getState;
export type RootStateForSlice = ReturnType<typeof getState>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
export default store;
