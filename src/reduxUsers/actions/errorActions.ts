// import { ModalValues } from '../../interfacesAndTypes/interfacesAndTypes';
import { setErrMessage } from '../slices/errorSlice';
import { AppDispatch } from '../store';

export const updateErrorState = (data: string) => {
  return (dispatch: AppDispatch) => {
    dispatch(setErrMessage(data));
  };
};
