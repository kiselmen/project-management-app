import { combineReducers } from 'redux';
import { reducerisLogin } from './reducerIsLogin';
import authReducer from '../slices/authSlice';

export const rootReducer = combineReducers({
  reduserIsLogin: reducerisLogin,
  auth: authReducer,
});
