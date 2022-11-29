import { setErrMessage } from '../slices/errorSlice';
import { setIsOpen } from '../slices/modalSlice';
import { logout } from '../slices/authSlice';
import { AppDispatch } from '../store';

export const checkErrStatus = (dispatch: AppDispatch, e: { response: Response }, text: string) => {
  if (e.response !== undefined) {
    if (!e.response.ok) {
      dispatch(logout());
      dispatch(setErrMessage('Server timed out'));
    } else {
      dispatch(setErrMessage({ text }));
    }
  } else {
    dispatch(setErrMessage('Something went wrong'));
    dispatch(logout());
  }
  dispatch(setIsOpen({ isOpen: true, type: 'ERROR' }));
};
