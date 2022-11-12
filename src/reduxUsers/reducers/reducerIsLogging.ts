import initialState from '../initialState';
import {
  ActionType,
  ActionTypes,
  IInitialState,
} from '../../interfacesAndTypes/interfacesAndTypes';

const reducerIsLogging = (state = initialState, action: ActionType): IInitialState => {
  switch (action.type) {
    case ActionTypes.LOGIN:
      return {
        ...state,
        isLogging: action.value,
      };

    default:
      return state;
  }
};

export { reducerIsLogging };
