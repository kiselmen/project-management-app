import { createSlice } from '@reduxjs/toolkit';
import { ModalValues } from '../../interfacesAndTypes/interfacesAndTypes';
import { RootStateForSlice } from '../store';

const initialState: ModalValues = {
  isOpen: false,
  type: 'NONE',
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setIsOpen(state, action) {
      state.isOpen = action.payload.isOpen;
      state.type = action.payload.type;
    },
  },
});

export const state = (state: RootStateForSlice) => state.modal;

export const { setIsOpen } = modalSlice.actions;

export default modalSlice.reducer;
