import { AuthPageValues } from '../../interfacesAndTypes/interfacesAndTypes';
import axios from 'axios';
import { login, logout } from '../slices/authSlice';
import { AppDispatch } from '../store';
import { successRequest } from '../slices/profileSlice';
import { isOpenEdit } from '../slices/profileSlice';
import { setErrMessage } from '../slices/errorSlice';
import { setIsOpen } from '../slices/modalSlice';

export const signUp = (data: AuthPageValues) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.post<AuthPageValues>(
        'https://final-task-backend-production-08b7.up.railway.app/auth/signup',
        data
      );
      dispatch(
        login({
          _id: response.data._id,
          name: response.data.name,
          login: response.data.login,
          token: response.data.token || '',
        })
      );
    } catch {
      dispatch(setErrMessage('Account exists'));
      dispatch(setIsOpen({ isOpen: true, type: 'ERROR' }));
    }
  };
};

export const signIn = (data: AuthPageValues) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.post<AuthPageValues>(
        'https://final-task-backend-production-08b7.up.railway.app/auth/signin',
        data
      );
      dispatch(
        login({
          _id: response.data._id,
          name: response.data.name,
          login: data.login,
          token: response.data.token,
        })
      );
      dispatch(successRequest({ updateSuccess: true }));
      setTimeout(() => dispatch(successRequest({ updateSuccess: false })), 5000);
    } catch {
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
      const response = await axios.delete<AuthPageValues>(
        `https://final-task-backend-production-08b7.up.railway.app/users/${userId}`,
        { headers: { Authorization: 'Bearer ' + token } }
      );
      dispatch(logout());
      return response;
    } catch {
      dispatch(setErrMessage('Something went wrong'));
      dispatch(setIsOpen({ isOpen: true, type: 'ERROR' }));
    }
  };
};

export const updateUser = (data: AuthPageValues) => {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.put<AuthPageValues>(
        `https://final-task-backend-production-08b7.up.railway.app/users/${userId}`,
        data,
        { headers: { Authorization: 'Bearer ' + token } }
      );
      dispatch(
        login({
          _id: response.data._id,
          name: response.data.name,
          login: response.data.login,
          token: response.data.token || '',
        })
      );
      dispatch(successRequest({ updateSuccess: true }));
      dispatch(isOpenEdit({ openEdit: false }));
      setTimeout(() => dispatch(successRequest({ updateSuccess: false })), 5000);
    } catch {
      dispatch(setErrMessage('Something went wrong'));
      dispatch(setIsOpen({ isOpen: true, type: 'ERROR' }));
    }
  };
};
