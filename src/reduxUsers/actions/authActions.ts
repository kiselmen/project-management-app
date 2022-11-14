import { AuthPageValues } from '../../interfacesAndTypes/interfacesAndTypes';
import axios from 'axios';
import { login } from '../slices/authSlice';
import { AppDispatch } from '../store';

export const register = (data: AuthPageValues) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.post<AuthPageValues>(
        'https://final-task-backend-production-08b7.up.railway.app/auth/signup',
        data
      );
      dispatch(
        login({
          _id: response.data._id,
          name: data.name,
          login: data.login,
          password: data.password,
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
          _id: response.data._id,
          name: data.name,
          login: data.login,
          password: data.password,
        })
      );
    } catch (e) {
      alert('Лол ты уже зареган');
    }
  };
};
