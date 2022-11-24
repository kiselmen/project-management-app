import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useAppDispatch } from '../../reduxUsers/hook/reduxCustomHook';
import { setModalState } from '../../reduxUsers/actions/modalActions';
import { FormContainerStyles, FormStyles } from './Form.styles';
import { useSelector } from 'react-redux';
import { state as boardState } from '../../reduxUsers/slices/boardSlice';
import { state as columnState } from '../../reduxUsers/slices/columnSlice';
import { deleteColumn } from '../../reduxUsers/actions/columnActions';
import Box from '@mui/material/Box';

const DeleteColumn = () => {
  const dispatch = useAppDispatch();
  const token = localStorage.getItem('token') as string;
  const { activeBoardId } = useSelector(boardState);
  const { activeColumnId } = useSelector(columnState);

  const onDelete = async () => {
    dispatch(setModalState({ isOpen: true, type: 'LOADING' }));
    await dispatch(
      deleteColumn(activeBoardId as string, activeColumnId as string, token as string)
    );
  };

  const cancelAction = () => {
    dispatch(setModalState({ isOpen: false, type: 'NONE' }));
  };

  return (
    <FormContainerStyles>
      <Typography variant="h5" component="h2">
        {'Delete column'}
      </Typography>
      <FormStyles onSubmit={() => onDelete()}>
        <Typography>{'Are you shure, delete this column with all tasks?'}</Typography>
        <Box sx={{ '& button': { m: 1 } }}>
          <Button color="error" size="small" variant="contained" type="submit">
            {'Submit'}
          </Button>
          <Button color="primary" size="small" variant="contained" onClick={() => cancelAction()}>
            {'Cancel'}
          </Button>
        </Box>
      </FormStyles>
    </FormContainerStyles>
  );
};

export default DeleteColumn;
