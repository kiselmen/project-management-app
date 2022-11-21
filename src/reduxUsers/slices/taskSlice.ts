import { createSlice } from '@reduxjs/toolkit';
import { TaskData, TaskValues, ColumnTaskData } from '../../interfacesAndTypes/interfacesAndTypes';
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
    // addTask(state, action) {
    //   state.allTasks = [...(state.allTasks as TaskData[]), action.payload];
    // },
    // delTask(state, action) {
    //   state.allTasks = state.allTasks?.filter((item) => item._id !== action.payload);
    // },
    setActiveTaskId(state, action) {
      state.activeTaskId = action.payload;
    },
  },
});

export const state = (state: RootStateForSlice) => state.task;

export const { setAllColumnTasks, setActiveTaskId } = columnSlice.actions;

export default columnSlice.reducer;
