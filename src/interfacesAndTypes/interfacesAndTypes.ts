import { AnyAction } from '@reduxjs/toolkit';

interface IInitialState {
  isLogin: boolean;
}

enum ActionTypes {
  LOGIN = 'LOGIN',
}

interface ISetisLogin {
  type: ActionTypes.LOGIN;
  value: boolean;
}

type ActionType = ISetisLogin | AnyAction;

export { ActionTypes };
export type { ActionType, ISetisLogin, IInitialState };

export type AuthPageValues = {
  token?: string;
  _id?: string;
  name?: string;
  login?: string;
  password?: string;
  isAuth?: boolean;
};
