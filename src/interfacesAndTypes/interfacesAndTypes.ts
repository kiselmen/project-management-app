import { AnyAction } from '@reduxjs/toolkit';

interface IInitialState {
  isLogging: boolean;
}

enum ActionTypes {
  LOGIN = 'LOGIN',
}

interface ISetIsLogging {
  type: ActionTypes.LOGIN;
  value: boolean;
}

type ActionType = ISetIsLogging | AnyAction;

export { ActionTypes };
export type { ActionType, ISetIsLogging, IInitialState };

export type AuthPageValues = {
  _id?: string;
  name?: string;
  login?: string;
  password?: string;
  isAuth?: boolean;
};
