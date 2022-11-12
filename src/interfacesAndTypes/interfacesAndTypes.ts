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

type ActionType = ISetIsLogging;

export { ActionTypes };
export type { ActionType, ISetIsLogging, IInitialState };
