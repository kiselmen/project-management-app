import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, Link, TextField, Typography } from '@mui/material';
import { Link as RouterLink, Navigate, useLocation } from 'react-router-dom';
import { AuthPageValues } from '../../interfacesAndTypes/interfacesAndTypes';
import { signIn, signUp, updateUser } from '../../reduxUsers/actions/authActions';
import { useAppDispatch } from '../../reduxUsers/hook/reduxCustomHook';
import { FormContainerStyles, FormStyles } from './Form.styles';
import { useSelector } from 'react-redux';
import { stateUser } from '../../reduxUsers/slices/authSlice';

const CreateForm = () => {
  const stateIsLogin = useSelector(stateUser);
  const isLogin = stateIsLogin.isAuth;
  const location = useLocation();
  const currentUrl = location.pathname === '/registration';
  const profileUrl = location.pathname === '/profile';

  const dataFormValidation = {
    auth: {
      login: yup.string().required('Please enter your login'),
      password: yup
        .string()
        .min(5, 'Minimum 5 characters')
        .required('Please enter a valid password'),
    },
    authInitialValue: { login: '', password: '' },
    register: {
      name: yup
        .string()
        .min(3, 'Minimum 3 characters')
        .max(15, 'Maximum 15 characters')
        .required('Please enter your name'),
      login: yup
        .string()
        .min(2, 'Minimum 2 characters')
        .max(15, 'Maximum 15 characters')
        .required('Please enter your login'),
      password: yup
        .string()
        .min(5, 'Minimum 5 characters')
        .required('Please enter a valid password'),
    },
    registerInitialValue: { name: '', login: '', password: '' },
  };

  const validationSchema = yup.object(
    currentUrl || profileUrl ? dataFormValidation.register : dataFormValidation.auth
  );

  const dispatch = useAppDispatch();

  const userAuthPageSubmit = async (values: AuthPageValues) => {
    if (currentUrl) {
      await dispatch(signUp({ name: values.name, login: values.login, password: values.password }));
    } else if (profileUrl) {
      await dispatch(
        updateUser({ name: values.name, login: values.login, password: values.password })
      );
    }
    await dispatch(signIn({ login: values.login, password: values.password }));
  };

  const formik = useFormik({
    initialValues:
      currentUrl || profileUrl
        ? dataFormValidation.registerInitialValue
        : dataFormValidation.authInitialValue,
    validationSchema: validationSchema,
    onSubmit: userAuthPageSubmit,
  });

  if (isLogin && !profileUrl) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <FormContainerStyles>
        <Typography variant="h5" component="h2">
          {currentUrl ? 'Sign up' : !profileUrl ? 'Sign in' : 'Update profile'}
        </Typography>
        <FormStyles onSubmit={formik.handleSubmit}>
          {(currentUrl || profileUrl) && (
            <TextField
              fullWidth
              id="name"
              name="name"
              label="Name"
              type="text"
              value={formik.values.name ?? ''}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          )}
          <TextField
            fullWidth
            id="login"
            name="login"
            label="Login"
            type="text"
            value={formik.values.login}
            onChange={formik.handleChange}
            error={formik.touched.login && Boolean(formik.errors.login)}
            helperText={formik.touched.login && formik.errors.login}
          />
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button color="primary" variant="contained" fullWidth type="submit">
            {currentUrl ? 'Register' : !profileUrl ? 'Submit' : 'Update'}
          </Button>
        </FormStyles>
        {!currentUrl && !profileUrl ? (
          <Link component={RouterLink} to="/registration">
            Don&apos;t have an account? Register
          </Link>
        ) : profileUrl ? (
          ''
        ) : (
          <Link component={RouterLink} to="/authorization">
            Already have an account? Login
          </Link>
        )}
      </FormContainerStyles>
    </>
  );
};

export default CreateForm;
