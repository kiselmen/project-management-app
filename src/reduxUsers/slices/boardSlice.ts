import { createSlice } from '@reduxjs/toolkit';
import { BoardData, BoardValues } from '../../interfacesAndTypes/interfacesAndTypes';
import { RootStateForSlice } from '../store';

const initialState: BoardValues = {
  allBoards: [],
  activeBoardId: '',
};

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setAllUserBoards(state, action) {
      state.allBoards = action.payload;
    },
    addBoard(state, action) {
      state.allBoards = [...(state.allBoards as BoardData[]), action.payload];
    },
    delBoard(state, action) {
      state.allBoards = state.allBoards?.filter((item) => item._id !== action.payload);
    },
    setActiveBoard(state, actions) {
      state.activeBoardId = actions.payload;
    },
  },
});

export const state = (state: RootStateForSlice) => state.board;

export const { setAllUserBoards, addBoard, delBoard, setActiveBoard } = boardSlice.actions;

export default boardSlice.reducer;
