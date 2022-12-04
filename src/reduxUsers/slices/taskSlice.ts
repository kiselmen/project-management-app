import { createSlice, current } from '@reduxjs/toolkit';
import { TaskValues } from '../../interfacesAndTypes/interfacesAndTypes';
import { RootStateForSlice } from '../store';

const initialState: TaskValues = {
  allTasks: {},
  activeTaskId: '',
};

const columnSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setAllColumnTasks(state, action) {
      state.allTasks = { ...state.allTasks, [action.payload.columnId]: action.payload.columnTasks };
    },
    setActiveTaskId(state, action) {
      state.activeTaskId = action.payload;
    },
  },
});

export const state = (state: RootStateForSlice) => state.task;

export const { setAllColumnTasks, setActiveTaskId } = columnSlice.actions;

export default columnSlice.reducer;
