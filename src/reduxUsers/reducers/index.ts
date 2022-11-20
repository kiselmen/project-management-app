import { combineReducers } from 'redux';
import authReducer from '../slices/authSlice';
import modalReducer from '../slices/modalSlice';
import boardReducer from '../slices/boardSlice';
import errorReducer from '../slices/errorSlice';
import columnReducer from '../slices/columnSlice';
import taskReducer from '../slices/taskSlice';

export const rootReducer = combineReducers({
  auth: authReducer,
  modal: modalReducer,
  board: boardReducer,
  error: errorReducer,
  column: columnReducer,
  task: taskReducer,
});
