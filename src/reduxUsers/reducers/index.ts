import { combineReducers } from 'redux';
import { reducerIsLogging } from './reducerIsLogging';

export const rootReducer = combineReducers({
  isLogging: reducerIsLogging,
});

export type RootState = ReturnType<typeof rootReducer>;
