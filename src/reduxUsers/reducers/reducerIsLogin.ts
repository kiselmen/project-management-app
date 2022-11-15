import initialState from '../initialState';
import {
  ActionType,
  ActionTypes,
  IInitialState,
} from '../../interfacesAndTypes/interfacesAndTypes';

const reducerisLogin = (state = initialState, action: ActionType): IInitialState => {
  switch (action.type) {
    case ActionTypes.LOGIN:
      return {
        ...state,
        isLogin: action.value,
      };

    default:
      return state;
  }
};

export { reducerisLogin };
