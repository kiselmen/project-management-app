import { ActionType, ActionTypes } from '../../interfacesAndTypes/interfacesAndTypes';

const changeIsLogging = (isLogging: boolean): ActionType => {
  return {
    type: ActionTypes.LOGIN,
    value: isLogging,
  };
};

export { changeIsLogging };
