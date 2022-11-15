import { AuthPageValues } from '../../interfacesAndTypes/interfacesAndTypes';
import axios from 'axios';
import { reg, login } from '../slices/authSlice';
import { AppDispatch } from '../store';

export const register = (data: AuthPageValues) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.post<AuthPageValues>(
        'https://final-task-backend-production-08b7.up.railway.app/auth/signup',
        data
      );
      dispatch(
        reg({
          _id: response.data._id,
          name: response.data.name,
          login: response.data.login,
        })
      );
    } catch (e) {
      alert('Лол ты уже зареган');
    }
  };
};

export const logIn = (data: AuthPageValues) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.post<AuthPageValues>(
        'https://final-task-backend-production-08b7.up.railway.app/auth/signin',
        data
      );
      dispatch(
        login({
          token: response.data.token,
          login: data.login,
        })
      );
    } catch (e) {
      alert('Такого аккаунта нет');
    }
  };
};
