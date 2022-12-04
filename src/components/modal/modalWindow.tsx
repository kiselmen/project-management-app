import { Backdrop, Box, Modal, Fade } from '@mui/material';
import { useSelector } from 'react-redux';
import { state as modalState } from '../../reduxUsers/slices/modalSlice';
import { useAppDispatch } from '../../reduxUsers/hook/reduxCustomHook';
import { setModalState } from '../../reduxUsers/actions/modalActions';
import CreateBoardForm from '../forms/CreateBoardForm';
import CreateColumnForm from '../forms/CreateColumnForm';
import CreateTaskForm from '../forms/CreateTaskForm';
import Loading from '../loading';
import ErrorMessage from '../errorMessage';
import DeleteBoard from '../forms/DeleteBoard';
import DeleteColumn from '../forms/DeleteColumn';
import DeleteTask from '../forms/DeleteTask';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 320,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius: 1,
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
          timeout: 200,
        }}
      >
        <Fade in={isOpen}>
          <Box sx={style}>
            {type === 'ERROR' && <ErrorMessage />}
            {type === 'LOADING' && <Loading />}
            {(type === 'ADD_BOARD' || type === 'EDIT_BOARD') && <CreateBoardForm />}
            {(type === 'ADD_COLUMN' || type === 'EDIT_COLUMN') && <CreateColumnForm />}
            {(type === 'ADD_TASK' || type === 'EDIT_TASK') && <CreateTaskForm />}
            {type === 'DELETE_BOARD' && <DeleteBoard />}
            {type === 'DELETE_COLUMN' && <DeleteColumn />}
            {type === 'DELETE_TASK' && <DeleteTask />}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default ModalWindow;
