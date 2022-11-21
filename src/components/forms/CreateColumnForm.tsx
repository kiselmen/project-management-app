import { useFormik } from 'formik';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { ColumnData } from '../../interfacesAndTypes/interfacesAndTypes';
import {
  addNewColumn,
  editActiveColumn,
  updateActiveColumnId,
} from '../../reduxUsers/actions/columnActions';
import { useAppDispatch } from '../../reduxUsers/hook/reduxCustomHook';
import { FormContainerStyles, FormStyles } from './Form.styles';
import { setModalState } from '../../reduxUsers/actions/modalActions';
import { state as modalState } from '../../reduxUsers/slices/modalSlice';
import { state as columnState } from '../../reduxUsers/slices/columnSlice';
import { state as boardState } from '../../reduxUsers/slices/boardSlice';
import { useSelector } from 'react-redux';

const CreateForm = () => {
  const token = localStorage.getItem('token') as string;
  const { type } = useSelector(modalState);

  const { allColumns, activeColumnId } = useSelector(columnState);
  const { activeBoardId } = useSelector(boardState);

  const activeColumn = allColumns?.filter((item) => item._id === activeColumnId)[0] as ColumnData;
  // const { title, order, boardId } = activeColumn;
  const title = activeColumn ? activeColumn.title : '';
  const order = activeColumn ? activeColumn.order : 0;
  const boardId = activeColumn ? activeColumn.boardId : '';

  const dataFormValidation = {
    newColumn: {
      title: yup.string().required(''),
    },
    newColumnInitialValue: type === 'ADD_COLUMN' ? { title: '' } : { title, order, boardId },
  };

  const validationSchema = yup.object(dataFormValidation.newColumn);

  const dispatch = useAppDispatch();

  const addPageSubmit = async (values: ColumnData) => {
    dispatch(setModalState({ isOpen: true, type: 'LOADING' }));
    const newOrder = allColumns ? allColumns.length + 1 : 1;
    type === 'ADD_COLUMN'
      ? await dispatch(
          addNewColumn({ title: values.title, order: newOrder }, activeBoardId as string, token)
        )
      : await dispatch(
          editActiveColumn(
            { title: values.title, order },
            activeBoardId as string,
            activeColumnId as string,
            token
          )
        );
    dispatch(updateActiveColumnId(''));
  };

  const formik = useFormik({
    initialValues: dataFormValidation.newColumnInitialValue,
    validationSchema: validationSchema,
    onSubmit: addPageSubmit,
  });

  return (
    <>
      <FormContainerStyles>
        <Typography variant="h5" component="h2">
          {type === 'ADD_COLUMN' ? 'Add column' : 'Edit column'}
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
          <Button color="primary" variant="contained" fullWidth type="submit">
            {'Submit'}
          </Button>
        </FormStyles>
      </FormContainerStyles>
    </>
  );
};

export default CreateForm;
