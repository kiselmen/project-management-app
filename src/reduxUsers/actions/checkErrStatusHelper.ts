import { setErrMessage } from '../slices/errorSlice';
import { setIsOpen } from '../slices/modalSlice';
import { logout } from '../slices/authSlice';
import { AppDispatch } from '../store';

export const checkErrStatus = (dispatch: AppDispatch, e: { response: Response }, text: string) => {
  if (!e.response.ok) {
    dispatch(logout());
    dispatch(setErrMessage('Server timed out'));
    dispatch(setIsOpen({ isOpen: true, type: 'ERROR' }));
  } else {
    dispatch(setErrMessage({ text }));
    dispatch(setIsOpen({ isOpen: true, type: 'ERROR' }));
  }
};
