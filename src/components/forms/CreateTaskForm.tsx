import { useFormik } from 'formik';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { TaskData } from '../../interfacesAndTypes/interfacesAndTypes';
import { updateActiveColumnId } from '../../reduxUsers/actions/columnActions';
import { useAppDispatch } from '../../reduxUsers/hook/reduxCustomHook';
import { FormContainerStyles, FormStyles } from './Form.styles';
import { setModalState } from '../../reduxUsers/actions/modalActions';
import { state as modalState } from '../../reduxUsers/slices/modalSlice';
import { state as columnState } from '../../reduxUsers/slices/columnSlice';
import { state as taskState } from '../../reduxUsers/slices/taskSlice';
import { state as boardState } from '../../reduxUsers/slices/boardSlice';
import { useSelector } from 'react-redux';
import { addNewTask, editActiveTask } from '../../reduxUsers/actions/taskActions';
import Box from '@mui/material/Box';

const CreateForm = () => {
  const token = localStorage.getItem('token') as string;
  const userIdDefault = localStorage.getItem('userId') as string;
  const { type } = useSelector(modalState);

  const { activeBoardId } = useSelector(boardState);
  const { activeColumnId } = useSelector(columnState);
  const { allTasks, activeTaskId } = useSelector(taskState);
  const usersDefault = [] as string[];

  const activeColumnTasks =
    allTasks && activeColumnId ? allTasks[activeColumnId] : ([] as TaskData[]);

  const activeTask = activeColumnTasks?.filter((item) => item._id === activeTaskId)[0] as TaskData;
  const title = activeTask ? activeTask.title : '';
  const order = activeTask ? activeTask.order : 0;
  const boardId = activeTask ? activeTask.boardId : activeBoardId;
  const columnId = activeTask ? activeTask.columnId : activeColumnId;
  const description = activeTask ? activeTask.description : '';
  const userId = activeTask ? activeTask.userId : userIdDefault;
  const users = activeTask ? activeTask.users : usersDefault;

  const dataFormValidation = {
    newColumn: {
      title: yup.string().required(''),
      description: yup.string().required(''),
    },
    newColumnInitialValue:
      type === 'ADD_TASK'
        ? {
            title: '',
            order: activeColumnTasks ? activeColumnTasks.length + 1 : 1,
            description: '',
            userId,
            users,
          }
        : { title, order, description, columnId, userId, users },
  };

  const validationSchema = yup.object(dataFormValidation.newColumn);

  const dispatch = useAppDispatch();

  const addPageSubmit = async (values: TaskData) => {
    dispatch(setModalState({ isOpen: true, type: 'LOADING' }));
    type === 'ADD_TASK'
      ? await dispatch(
          addNewTask(
            {
              title: values.title,
              order: values.order,
              description: values.description,
              userId: values.userId,
              users: values.users,
            },
            boardId as string,
            columnId as string,
            token
          )
        )
      : await dispatch(
          editActiveTask(
            {
              title: values.title,
              order,
              description: values.description,
              columnId: columnId as string,
              userId: values.userId,
              users: values.users,
            },
            boardId as string,
            columnId as string,
            activeTaskId as string,
            token
          )
        );
    dispatch(updateActiveColumnId(''));
  };

  const cancelAction = () => {
    dispatch(setModalState({ isOpen: false, type: 'NONE' }));
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
          {type === 'ADD_TASK' ? 'Add task' : 'Edit task'}
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
            id="description"
            name="description"
            label="description"
            type="text"
            value={formik.values.description}
            onChange={formik.handleChange}
            error={formik.touched.description && Boolean(formik.errors.description)}
            helperText={formik.touched.description && formik.errors.description}
          />
          <Box sx={{ '& button': { m: 1 } }}>
            <Button color="primary" size="small" variant="contained" type="submit">
              {'Submit'}
            </Button>
            <Button color="error" size="small" variant="contained" onClick={() => cancelAction()}>
              {'Cancel'}
            </Button>
          </Box>
        </FormStyles>
      </FormContainerStyles>
    </>
  );
};

export default CreateForm;
