import { createSlice } from '@reduxjs/toolkit';
import { ColumnData, ColumnValues } from '../../interfacesAndTypes/interfacesAndTypes';
import { RootStateForSlice } from '../store';

const initialState: ColumnValues = {
  allColumns: [],
  activeColumnId: '',
  searchColumnValue: '',
};

const columnSlice = createSlice({
  name: 'column',
  initialState,
  reducers: {
    setAllBoardColumns(state, action) {
      state.allColumns = action.payload.sort((a: string, b: string) => {
        return Number(a) - Number(b);
      });
    },
    addColumn(state, action) {
      state.allColumns = [...(state.allColumns as ColumnData[]), action.payload];
    },
    delColumn(state, action) {
      state.allColumns = state.allColumns?.filter((item) => item._id !== action.payload);
    },
    setActiveColumnId(state, action) {
      state.activeColumnId = action.payload;
    },
    setSearchColumnValue(state, action) {
      state.searchColumnValue = action.payload;
    },
  },
});

export const state = (state: RootStateForSlice) => state.column;

export const { setAllBoardColumns, addColumn, delColumn, setActiveColumnId, setSearchColumnValue } =
  columnSlice.actions;

export default columnSlice.reducer;
