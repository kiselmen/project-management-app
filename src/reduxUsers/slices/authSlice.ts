import { createSlice } from '@reduxjs/toolkit';
import { AuthPageValues } from '../../interfacesAndTypes/interfacesAndTypes';
import { RootStateForSlice } from '../store';

const initialState: AuthPageValues = {
  _id: localStorage.getItem('userId')! ?? '',
  name: localStorage.getItem('userName')! ?? '',
  token: localStorage.getItem('token')! ?? '',
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
      state.token = action.payload.token;
      state.isAuth = Boolean(action.payload._id);
      localStorage.setItem('userId', action.payload._id);
      localStorage.setItem('userName', action.payload.name);
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('login', action.payload.login);
    },
    logout(state) {
      state._id = '';
      state.name = '';
      state.login = '';
      state.token = '';
      state.isAuth = false;
      localStorage.removeItem('userId');
      localStorage.removeItem('userName');
      localStorage.removeItem('token');
      localStorage.removeItem('login');
    },
  },
});

export const state = (state: RootStateForSlice) => state.auth;

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
