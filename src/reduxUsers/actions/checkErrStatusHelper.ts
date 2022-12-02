import { setErrMessage } from '../slices/errorSlice';
import { setIsOpen } from '../slices/modalSlice';
import { logout } from '../slices/authSlice';
import { AppDispatch } from '../store';
import { setSearchValue, setSortValue } from '../slices/boardSlice';

export const checkErrStatus = (dispatch: AppDispatch, e: { response: Response }, text: string) => {
  if (e.response !== undefined) {
    if (!e.response.ok) {
      dispatch(logout());
      dispatch(setSearchValue(''));
      dispatch(setSortValue(''));
      dispatch(setErrMessage('Server timed out'));
    } else {
      dispatch(setErrMessage({ text }));
    }
  } else {
    dispatch(setErrMessage('Something went wrong'));
    dispatch(logout());
    dispatch(setSearchValue(''));
    dispatch(setSortValue(''));
  }
  dispatch(setIsOpen({ isOpen: true, type: 'ERROR' }));
};
