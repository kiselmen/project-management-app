import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { useAppDispatch } from '../../reduxUsers/hook/reduxCustomHook';
import { setModalState } from '../../reduxUsers/actions/modalActions';
import { state as errorState } from '../../reduxUsers/slices/errorSlice';

const ErrorMessage = () => {
  const dispatch = useAppDispatch();
  const { errMessage } = useSelector(errorState);
  const closeError = () => {
    dispatch(setModalState({ isOpen: false, type: 'NONE' }));
  };

  const { t } = useTranslation();

  return (
    <div>
      <DialogTitle color="error" variant="h5" id="transition-modal-title">
        {t('error')}
      </DialogTitle>
      <DialogContent>
        <DialogContentText color="primary" id="transition-modal-description" tabIndex={-1}>
          {errMessage}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="error" id="transition-modal-description" onClick={closeError}>
          {t('close')}
        </Button>
      </DialogActions>
    </div>
  );
};

export default ErrorMessage;
