import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, TextField, Typography } from '@mui/material';
import { BoardData } from '../../interfacesAndTypes/interfacesAndTypes';
import {
  addNewBoard,
  editActiveBoard,
  updateActiveBoardId,
} from '../../reduxUsers/actions/boardActions';
import { useAppDispatch } from '../../reduxUsers/hook/reduxCustomHook';
import { FormContainerStyles, FormStyles } from './FormStyles';
import { setModalState } from '../../reduxUsers/actions/modalActions';
import { state as modalState } from '../../reduxUsers/slices/modalSlice';
import { state as boardState } from '../../reduxUsers/slices/boardSlice';
import { useSelector } from 'react-redux';

const CreateForm = () => {
  const token = localStorage.getItem('token') as string;
  const _id = localStorage.getItem('userId') as string;
  const usersDefault = [] as string[];

  const { type } = useSelector(modalState);
  const { allBoards, activeBoardId } = useSelector(boardState);
  const activeBoard = allBoards?.filter((item) => item._id === activeBoardId)[0] as BoardData;
  // const { title, subscribe, owner, users } = activeBoard;
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
            token
          )
        )
      : await dispatch(
          editActiveBoard(
            { title: values.title, subscribe: values.subscribe, owner, users },
            activeBoard._id as string,
            token
          )
        );
    dispatch(updateActiveBoardId(''));
  };

  const formik = useFormik({
    initialValues: dataFormValidation.newBoardInitialValue,
    validationSchema: validationSchema,
    onSubmit: addPageSubmit,
  });

  return (
    <>
      <FormContainerStyles>
        <Typography variant="h5" component="h2">
          {type === 'ADD_BOARD' ? 'Add board' : 'Edit board'}
        </Typography>
        <FormStyles onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="title"
            name="title"
            label="Title"
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
            label="Subscribe"
            type="text"
            value={formik.values.subscribe}
            onChange={formik.handleChange}
            error={formik.touched.subscribe && Boolean(formik.errors.subscribe)}
            helperText={formik.touched.subscribe && formik.errors.subscribe}
          />
          <Button color="primary" variant="contained" fullWidth type="submit">
            {'Submit'}
          </Button>
        </FormStyles>
      </FormContainerStyles>
    </>
  );
};

export default CreateForm;
