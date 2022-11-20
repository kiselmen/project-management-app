import { createSlice } from '@reduxjs/toolkit';
import { RootStateForSlice } from '../store';

const initialState: { updateSuccess: boolean; openEdit: boolean } = {
  updateSuccess: false,
  openEdit: false,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    successRequest(state, action) {
      state.updateSuccess = action.payload.updateSuccess;
    },
    isOpenEdit(state, action) {
      state.openEdit = action.payload.openEdit;
    },
  },
});

export const stateProfile = (state: RootStateForSlice) => state.profile;

export const { successRequest, isOpenEdit } = profileSlice.actions;

export default profileSlice.reducer;
