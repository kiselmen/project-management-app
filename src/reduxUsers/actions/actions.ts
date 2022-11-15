import { ActionType, ActionTypes } from '../../interfacesAndTypes/interfacesAndTypes';

const changeisLogin = (payload: boolean): ActionType => {
  return {
    type: ActionTypes.LOGIN,
    value: payload,
  };
};

export { changeisLogin };
