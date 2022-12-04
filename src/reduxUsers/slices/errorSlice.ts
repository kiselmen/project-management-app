import { createSlice } from '@reduxjs/toolkit';
import { RootStateForSlice } from '../store';

const initialState = {
  errMessage: '',
};

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setErrMessage(state, action) {
      state.errMessage = action.payload;
    },
  },
});

export const state = (state: RootStateForSlice) => state.error;

export const { setErrMessage } = errorSlice.actions;

export default errorSlice.reducer;
