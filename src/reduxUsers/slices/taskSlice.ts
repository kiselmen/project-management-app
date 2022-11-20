import { createSlice } from '@reduxjs/toolkit';
import { TaskData, TaskValues } from '../../interfacesAndTypes/interfacesAndTypes';
import { RootStateForSlice } from '../store';

const initialState: TaskValues = {
  allTasks: [],
  activeTaskId: '',
};

const columnSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setAllColumnTasks(state, action) {
      state.allTasks = action.payload.sort((a: string, b: string) => {
        return Number(a) - Number(b);
      });
    },
    addTask(state, action) {
      state.allTasks = [...(state.allTasks as TaskData[]), action.payload];
    },
    delTask(state, action) {
      state.allTasks = state.allTasks?.filter((item) => item._id !== action.payload);
    },
    setActiveTaskId(state, action) {
      state.activeTaskId = action.payload;
    },
  },
});

export const state = (state: RootStateForSlice) => state.task;

export const { setAllColumnTasks, addTask, delTask, setActiveTaskId } = columnSlice.actions;

export default columnSlice.reducer;
