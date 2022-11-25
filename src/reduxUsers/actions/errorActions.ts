// import { ModalValues } from '../../interfacesAndTypes/interfacesAndTypes';
import { setErrMessage } from '../slices/errorSlice';
import { AppDispatch } from '../store';

export const updateErrorState = (data: string) => {
  return (dispatch: AppDispatch) => {
    const errorObj = JSON.parse(data);
    let errMessage = data;
    if (errorObj.message) {
      errMessage = errorObj.message;
    }
    dispatch(setErrMessage(errMessage));
  };
};
