import { useFormik } from 'formik';
import styled from 'styled-components';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { AuthPageValues } from '../../interfacesAndTypes/interfacesAndTypes';
import { useCreateProductMutation } from '../../reduxUsers/api/createApiRequests';

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
  const validationSchema = yup.object({
    name: yup.string().max(15, 'Maximum 10 characters').required('Please enter your name'),
    login: yup.string().max(15, 'Maximum 20 characters').required('Please enter your login'),
    password: yup.string().min(5, 'Minimum 5 characters').required('Please enter a valid password'),
  });

  const userAuthPageSubmit = (values: AuthPageValues) => {
    // alert(JSON.stringify(values, null, 2));
    // eslint-disable-next-line react-hooks/rules-of-hooks
    console.log(values);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useCreateProductMutation({ values });
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      login: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: userAuthPageSubmit,
  });

  const location = useLocation();
  const currentUrl = location.pathname === '/registration';

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
