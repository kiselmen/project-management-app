// import React from 'react';
import { Button, Typography } from '@mui/material';
import { useAppDispatch } from '../../reduxUsers/hook/reduxCustomHook';
import { setModalState } from '../../reduxUsers/actions/modalActions';
import { state as errorState } from '../../reduxUsers/slices/errorSlice';
import { useSelector } from 'react-redux';

const ErrorMessage = () => {
  const dispatch = useAppDispatch();
  const { errMessage } = useSelector(errorState);
  const closeError = () => {
    dispatch(setModalState({ isOpen: false, type: 'NONE' }));
  };

  return (
    <>
      <Typography id="transition-modal-title" variant="h6" component="h2">
        Error
      </Typography>
      <Typography id="transition-modal-description" sx={{ mt: 2 }}>
        {errMessage}
      </Typography>
      <Button variant="outlined" color="error" onClick={closeError}>
        Close
      </Button>
    </>
  );
};

export default ErrorMessage;
