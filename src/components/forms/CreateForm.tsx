import { useFormik } from 'formik';
import styled from 'styled-components';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { AuthPageValues } from '../../interfacesAndTypes/interfacesAndTypes';
import { logIn, register } from '../../reduxUsers/actions/authActions';
import { useAppDispatch } from '../../reduxUsers/hook/reduxCustomHook';

const FormContainerStyles = styled.div`
  text-align: center;
  padding-top: 2rem;
  max-width: 20rem;
  margin: 0 auto;
`;
const FormStyles = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  padding: 1rem 0rem;
`;

const CreateForm = () => {
  const location = useLocation();
  const currentUrl = location.pathname === '/registration';

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
      name: yup.string().max(15, 'Maximum 10 characters').required('Please enter your name'),
      login: yup
        .string()
        .min(2, 'Minimum 2 characters')
        .max(15, 'Maximum 20 characters')
        .required('Please enter your login'),
      password: yup
        .string()
        .min(5, 'Minimum 5 characters')
        .required('Please enter a valid password'),
    },
    registerInitialValue: { name: '', login: '', password: '' },
  };

  const validationSchema = yup.object(
    !currentUrl ? dataFormValidation.auth : dataFormValidation.register
  );

  const dispatch = useAppDispatch();

  const userAuthPageSubmit = (values: AuthPageValues) => {
    dispatch(
      currentUrl
        ? register({ name: values.name, login: values.login, password: values.password })
        : logIn({ name: values.name, login: values.login, password: values.password })
    );
  };

  const formik = useFormik({
    initialValues: !currentUrl
      ? dataFormValidation.authInitialValue
      : dataFormValidation.registerInitialValue,
    validationSchema: validationSchema,
    onSubmit: userAuthPageSubmit,
  });

  return (
    <>
      <FormContainerStyles>
        <Typography variant="h5" component="h2">
          {currentUrl ? 'Sign up' : 'Sign in'}
        </Typography>
        <FormStyles onSubmit={formik.handleSubmit}>
          {currentUrl && (
            <TextField
              fullWidth
              id="name"
              name="name"
              label="Name"
              type="text"
              value={formik.values.name}
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
            {currentUrl ? 'Register' : 'Submit'}
          </Button>
        </FormStyles>
        {!currentUrl ? (
          <Link component={RouterLink} to="/registration">
            Don&apos;t have an account? Register
          </Link>
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
