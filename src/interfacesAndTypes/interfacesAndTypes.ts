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

type ActionType = ISetisLogin;

export { ActionTypes };
export type { ActionType, ISetisLogin, IInitialState };
