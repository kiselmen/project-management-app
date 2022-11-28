import { useFormik } from 'formik';
import * as yup from 'yup';
import { Box, Button, TextField, Typography } from '@mui/material';
import { BoardData } from '../../interfacesAndTypes/interfacesAndTypes';
import {
  addNewBoard,
  editActiveBoard,
  updateActiveBoardId,
} from '../../reduxUsers/actions/boardActions';
import { useAppDispatch } from '../../reduxUsers/hook/reduxCustomHook';
import { FormContainerStyles, FormStyles } from './Form.styles';
import { setModalState } from '../../reduxUsers/actions/modalActions';
import { state as modalState } from '../../reduxUsers/slices/modalSlice';
import { state as boardState } from '../../reduxUsers/slices/boardSlice';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const CreateForm = () => {
  const { t } = useTranslation();
  const _id = localStorage.getItem('userId') as string;
  const usersDefault = [] as string[];

  const { type } = useSelector(modalState);
  const { allBoards, activeBoardId } = useSelector(boardState);
  const activeBoard = allBoards?.filter((item) => item._id === activeBoardId)[0] as BoardData;
  const title = activeBoard ? activeBoard.title : '';
  const subscribe = activeBoard ? activeBoard.subscribe : '';
  const owner = activeBoard ? activeBoard.owner : '';
  const users = activeBoard ? activeBoard.users : usersDefault;

  const dataFormValidation = {
    newBoard: {
      title: yup.string().required(''),
      subscribe: yup.string(),
    },
    newBoardInitialValue:
      type === 'ADD_BOARD'
        ? { title: '', subscribe: '', owner: _id, users: usersDefault }
        : { title, subscribe, owner, users },
  };

  const validationSchema = yup.object(dataFormValidation.newBoard);

  const dispatch = useAppDispatch();

  const addPageSubmit = async (values: BoardData) => {
    dispatch(setModalState({ isOpen: true, type: 'LOADING' }));
    type === 'ADD_BOARD'
      ? await dispatch(
          addNewBoard(
            { title: values.title, subscribe: values.subscribe, owner: _id, users: usersDefault },
            localStorage.getItem('token') as string
          )
        )
      : await dispatch(
          editActiveBoard(
            { title: values.title, subscribe: values.subscribe, owner, users },
            activeBoard._id as string,
            localStorage.getItem('token') as string
          )
        );
    dispatch(updateActiveBoardId(''));
  };

  const cancelAction = () => {
    dispatch(setModalState({ isOpen: false, type: 'NONE' }));
  };

  const formik = useFormik({
    initialValues: dataFormValidation.newBoardInitialValue,
    validationSchema: validationSchema,
    onSubmit: addPageSubmit,
  });

  const titleForm = type === 'ADD_BOARD' ? t('Add board') : t('Edit board');

  return (
    <>
      <FormContainerStyles>
        <Typography variant="h5" component="h2">
          {t(titleForm)}
        </Typography>
        <FormStyles onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="title"
            name="title"
            label={t('Title')}
            type="text"
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />
          <TextField
            fullWidth
            id="subscribe"
            name="subscribe"
            label={t('Subscribe')}
            type="text"
            value={formik.values.subscribe}
            onChange={formik.handleChange}
            error={formik.touched.subscribe && Boolean(formik.errors.subscribe)}
            helperText={formik.touched.subscribe && formik.errors.subscribe}
          />
          <Box sx={{ '& button': { m: 1 } }}>
            <Button color="primary" size="small" variant="contained" type="submit">
              {t('Submit')}
            </Button>
            <Button color="error" size="small" variant="contained" onClick={() => cancelAction()}>
              {t('Cancel')}
            </Button>
          </Box>
        </FormStyles>
      </FormContainerStyles>
    </>
  );
};

export default CreateForm;
