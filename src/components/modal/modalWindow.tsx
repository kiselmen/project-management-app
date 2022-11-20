// import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { useSelector } from 'react-redux';
import { state as modalState } from '../../reduxUsers/slices/modalSlice';
import { useAppDispatch } from '../../reduxUsers/hook/reduxCustomHook';
import { setModalState } from '../../reduxUsers/actions/modalActions';
import CreateBoardForm from '../forms/CreateBoardForm';
import CreateColumnForm from '../forms/CreateColumnForm';
import CreateTaskForm from '../forms/CreateTaskForm';
import Loading from '../loading';
import ErrorMessage from '../errorMessage';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ModalWindow = () => {
  const { isOpen, type } = useSelector(modalState);
  const dispatch = useAppDispatch();

  const handleClose = () => {
    if (type !== 'LOADING') {
      dispatch(setModalState({ isOpen: false, type: 'NONE' }));
    }
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isOpen as boolean}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isOpen}>
          <Box sx={style}>
            {type === 'ERROR' && <ErrorMessage />}
            {type === 'LOADING' && <Loading />}
            {(type === 'ADD_BOARD' || type === 'EDIT_BOARD') && <CreateBoardForm />}
            {(type === 'ADD_COLUMN' || type === 'EDIT_COLUMN') && <CreateColumnForm />}
            {(type === 'ADD_TASK' || type === 'EDIT_TASK') && <CreateTaskForm />}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default ModalWindow;
