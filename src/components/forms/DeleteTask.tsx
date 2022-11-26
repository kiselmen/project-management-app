import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useAppDispatch } from '../../reduxUsers/hook/reduxCustomHook';
import { setModalState } from '../../reduxUsers/actions/modalActions';
import { FormContainerStyles, FormStyles } from './Form.styles';
import { useSelector } from 'react-redux';
import { state as boardState } from '../../reduxUsers/slices/boardSlice';
import { state as columnState } from '../../reduxUsers/slices/columnSlice';
import { state as taskState } from '../../reduxUsers/slices/taskSlice';
import { deleteTask } from '../../reduxUsers/actions/taskActions';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';

const DeleteTask = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const { activeBoardId } = useSelector(boardState);
  const { activeColumnId } = useSelector(columnState);
  const { activeTaskId } = useSelector(taskState);

  const onDelete = async () => {
    dispatch(setModalState({ isOpen: true, type: 'LOADING' }));
    await dispatch(
      deleteTask(
        activeBoardId as string,
        activeColumnId as string,
        activeTaskId as string,
        localStorage.getItem('token') as string
      )
    );
  };

  const cancelAction = () => {
    dispatch(setModalState({ isOpen: false, type: 'NONE' }));
  };

  return (
    <FormContainerStyles>
      <Typography variant="h5" component="h2">
        {t('Delete task')}
      </Typography>
      <FormStyles onSubmit={() => onDelete()}>
        <Typography>{t('Are you shure, delete this task?')}</Typography>
        <Box sx={{ '& button': { m: 1 } }}>
          <Button color="error" size="small" variant="contained" type="submit">
            {t('Submit')}
          </Button>
          <Button color="primary" size="small" variant="contained" onClick={() => cancelAction()}>
            {t('Cancel')}
          </Button>
        </Box>
      </FormStyles>
    </FormContainerStyles>
  );
};

export default DeleteTask;
