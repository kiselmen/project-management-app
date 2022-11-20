import { createSlice } from '@reduxjs/toolkit';
import { BoardData, BoardValues } from '../../interfacesAndTypes/interfacesAndTypes';
import { RootStateForSlice } from '../store';

const initialState: BoardValues = {
  allBoards: [] as BoardData[],
  activeBoardId: '',
  activeBoard: {} as BoardData,
  addNewBoard: false,
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
    setActiveBoardId(state, action) {
      state.activeBoardId = action.payload;
    },
    setActiveBoard(state, action) {
      state.activeBoard = action.payload;
    },
    setAddNewBoard(state, action) {
      state.addNewBoard = action.payload;
    },
  },
});

export const state = (state: RootStateForSlice) => state.board;

export const {
  setAllUserBoards,
  addBoard,
  delBoard,
  setActiveBoard,
  setActiveBoardId,
  setAddNewBoard,
} = boardSlice.actions;

export default boardSlice.reducer;
