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

export type ModalValues = {
  isOpen?: boolean;
  type?: string;
};

export type BoardValues = {
  allBoards?: BoardData[];
  activeBoardId?: string;
  activeBoard: BoardData;
  addNewBoard: boolean;
};

export type BoardData = {
  _id?: string;
  title?: string;
  subscribe?: string;
  owner?: string;
  users?: string[];
};

export type ColumnValues = {
  allColumns?: ColumnData[];
  activeColumnId?: string;
};

export type ColumnData = {
  _id?: string;
  title?: string;
  order?: number;
  boardId?: string;
};

export type TaskValues = {
  allTasks?: TaskData[];
  activeTaskId?: string;
};

export type TaskData = {
  _id?: string;
  title?: string;
  order?: number;
  boardId?: string;
  columnId?: string;
  description?: string;
  userId?: string;
  users?: string[];
};
