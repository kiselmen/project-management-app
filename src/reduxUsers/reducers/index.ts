import { combineReducers } from 'redux';
// import { reducerIsLogging } from './reducerIsLogging';
import authReducer from '../slices/authSlice';

export const rootReducer = combineReducers({
  // isLogging: reducerIsLogging,
  auth: authReducer,
});
