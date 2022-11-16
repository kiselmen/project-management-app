import { AuthPageValues } from '../../interfacesAndTypes/interfacesAndTypes';
import axios from 'axios';
import { login } from '../slices/authSlice';
import { AppDispatch } from '../store';

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
      // alert('Всё ты зареган, иди уже пили дальше');
    } catch (e) {
      alert('Лол ты уже зареган');
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
          login: response.data.login,
          token: response.data.token,
        })
      );
      alert('Всё ты залогинин, иди уже пили дальше');
    } catch (e) {
      alert('Такого аккаунта нет');
    }
  };
};
