import { createSlice } from '@reduxjs/toolkit';
import { BoardData, BoardValues } from '../../interfacesAndTypes/interfacesAndTypes';
import { RootStateForSlice } from '../store';

const initialState: BoardValues = {
  allBoards: [],
};

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setAllUserBoards(state, action) {
      // console.log('Все доски', action.payload);
      // console.log(state);
      state.allBoards = action.payload;
    },
    addBoard(state, action) {
      // console.log('Новая доска', action.payload);
      // console.log(state);
      state.allBoards = [...(state.allBoards as BoardData[]), action.payload];
    },
  },
});

export const state = (state: RootStateForSlice) => state.board;

export const { setAllUserBoards, addBoard } = boardSlice.actions;

export default boardSlice.reducer;
