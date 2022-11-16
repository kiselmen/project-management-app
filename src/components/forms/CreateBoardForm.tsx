import { useFormik } from 'formik';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { BoardData } from '../../interfacesAndTypes/interfacesAndTypes';
import { addNewBoard } from '../../reduxUsers/actions/boardActions';
import { useAppDispatch } from '../../reduxUsers/hook/reduxCustomHook';
import { FormContainerStyles, FormStyles } from './formsStyles';
import { setModalState } from '../../reduxUsers/actions/modalActions';

const CreateForm = () => {
  const token = localStorage.getItem('token') as string;
  const _id = localStorage.getItem('userId') as string;
  const users = [] as string[];

  const dataFormValidation = {
    newBoard: {
      title: yup.string().required(''),
      subscribe: yup.string(),
    },
    newBoardInitialValue: { title: '', subscribe: '', owner: token, users: users },
  };

  const validationSchema = yup.object(dataFormValidation.newBoard);

  const dispatch = useAppDispatch();

  const addPageSubmit = async (values: BoardData) => {
    dispatch(setModalState({ isOpen: true, type: 'LOADING' }));
    await dispatch(
      addNewBoard(
        { title: values.title, subscribe: values.subscribe, owner: _id, users: users },
        token
      )
    );
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
          {'Add board'}
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
            {'Add'}
          </Button>
        </FormStyles>
      </FormContainerStyles>
    </>
  );
};

export default CreateForm;
