import { createSlice } from '@reduxjs/toolkit';
import { AuthPageValues } from '../../interfacesAndTypes/interfacesAndTypes';
import { RootState } from '../store';

const initialState: AuthPageValues = {
  _id: localStorage.getItem('token')! ?? '',
  name: localStorage.getItem('username')! ?? '',
  login: localStorage.getItem('login')! ?? '',
  isAuth: Boolean(localStorage.getItem('token')),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state._id = action.payload._id;
      state.name = action.payload.name;
      state.login = action.payload.login;
      state.isAuth = Boolean(action.payload._id);
      localStorage.setItem('token', action.payload._id);
      localStorage.setItem('username', action.payload.name);
      localStorage.setItem('login', action.payload.login);
    },
    logout(state) {
      state._id = '';
      state.name = '';
      state.login = '';
      state.isAuth = false;
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('login');
    },
  },
});

export const state = (state: RootState) => state.auth;

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
