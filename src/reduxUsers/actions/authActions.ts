import { AuthPageValues } from '../../interfacesAndTypes/interfacesAndTypes';
import axios from 'axios';
import { login, logout } from '../slices/authSlice';
import { AppDispatch } from '../store';
import { successRequest } from '../slices/profileSlice';
import { isOpenEdit } from '../slices/profileSlice';
import { setErrMessage } from '../slices/errorSlice';
import { setIsOpen } from '../slices/modalSlice';
import { checkErrStatus } from './checkErrStatusHelper';
import { BASE_URL } from '../../consts/consts';

export const signUp = (data: AuthPageValues) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.post<AuthPageValues>(`${BASE_URL}auth/signup`, data);
      dispatch(
        login({
          _id: response.data._id,
          name: response.data.name,
          login: response.data.login,
          token: response.data.token || '',
        })
      );
      dispatch(signIn({ login: data.login, password: data.password }));
      dispatch(setIsOpen({ isOpen: false, type: 'NONE' }));
    } catch {
      dispatch(setErrMessage('Account exists'));
      dispatch(setIsOpen({ isOpen: true, type: 'ERROR' }));
    }
  };
};

export const signIn = (data: AuthPageValues) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.post<AuthPageValues>(`${BASE_URL}auth/signin`, data);
      dispatch(
        login({
          _id: response.data._id,
          name: response.data.name,
          login: data.login,
          token: response.data.token,
        })
      );
      dispatch(setIsOpen({ isOpen: false, type: 'NONE' }));
    } catch (e) {
      dispatch(setErrMessage('Account does not exist'));
      dispatch(setIsOpen({ isOpen: true, type: 'ERROR' }));
    }
  };
};

export const deleteUser = () => {
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.delete<AuthPageValues>(`${BASE_URL}users/${userId}`, {
        headers: { Authorization: 'Bearer ' + token },
      });
      dispatch(logout());
      dispatch(setIsOpen({ isOpen: false, type: 'NONE' }));
      return response;
    } catch (e) {
      checkErrStatus(dispatch, <{ response: Response }>e, 'Something went wrong');
    }
  };
};

export const updateUser = (data: AuthPageValues) => {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.put<AuthPageValues>(`${BASE_URL}users/${userId}`, data, {
        headers: { Authorization: 'Bearer ' + token },
      });
      dispatch(
        login({
          _id: response.data._id,
          name: response.data.name,
          login: response.data.login,
          token: response.data.token || '',
        })
      );
      dispatch(signIn({ login: data.login, password: data.password }));
      dispatch(successRequest({ updateSuccess: true }));
      dispatch(isOpenEdit({ openEdit: false }));
      dispatch(setIsOpen({ isOpen: false, type: 'NONE' }));
      setTimeout(() => dispatch(successRequest({ updateSuccess: false })), 5000);
    } catch (e) {
      checkErrStatus(dispatch, <{ response: Response }>e, 'Something went wrong');
    }
  };
};
