import { createSlice } from '@reduxjs/toolkit';
import { AuthPageValues } from '../../interfacesAndTypes/interfacesAndTypes';
import { RootStateForSlice } from '../store';

const initialState: AuthPageValues = {
  _id: localStorage.getItem('userID')! ?? '',
  name: localStorage.getItem('userName')! ?? '',
  token: localStorage.getItem('token')! ?? '',
  login: '',
  isAuth: Boolean(localStorage.getItem('userName')),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reg(state, action) {
      state._id = action.payload._id;
      state.name = action.payload.name;
      state.login = action.payload.login;
      state.isAuth = Boolean(action.payload._id);
      localStorage.setItem('userId', action.payload._id);
      localStorage.setItem('userName', action.payload.name);
    },
    login(state, action) {
      state._id = action.payload._id;
      state.login = action.payload.login;
      state.token = action.payload.token;
      state.isAuth = Boolean(action.payload._id);
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('userId', action.payload._id);
    },
    logout(state) {
      state._id = '';
      state.name = '';
      state.login = '';
      state.isAuth = false;
      localStorage.removeItem('userId');
      localStorage.removeItem('userName');
      localStorage.removeItem('token');
    },
  },
});

export const state = (state: RootStateForSlice) => state.auth;

export const { reg, login, logout } = authSlice.actions;

export default authSlice.reducer;
