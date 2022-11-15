import { combineReducers } from 'redux';
import { reducerisLogin } from './reducerIsLogin';

export const rootReducer = combineReducers({
  reduserIsLogin: reducerisLogin,
});

export type RootState = ReturnType<typeof rootReducer>;
