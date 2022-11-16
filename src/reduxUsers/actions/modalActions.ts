import { ModalValues } from '../../interfacesAndTypes/interfacesAndTypes';
import { setIsOpen } from '../slices/modalSlice';
import { AppDispatch } from '../store';

export const setModalState = (data: ModalValues) => {
  return (dispatch: AppDispatch) => {
    dispatch(
      setIsOpen({
        isOpen: data.isOpen,
        type: data.type,
      })
    );
  };
};
