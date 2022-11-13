import { useFormik } from 'formik';
import { AuthPageValues } from '../interfacesAndTypes/interfacesAndTypes';
import styled from 'styled-components';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';

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
  padding-top: 1rem;
`;

const UserAuthPage = () => {
  const validationSchema = yup.object({
    text: yup.string().max(15, 'Maximum 15 characters').required('Please enter your login'),
    password: yup.string().min(5, 'Minimum 5 characters').required('Please enter a valid password'),
  });

  const userAuthPageSubmit = (values: AuthPageValues) => {
    alert(JSON.stringify(values, null, 2));
  };

  const formik = useFormik({
    initialValues: {
      text: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: userAuthPageSubmit,
  });

  return (
    <>
      <FormContainerStyles>
        <Typography variant="h5" component="h2">
          Sign in
        </Typography>
        <FormStyles onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="text"
            name="text"
            label="Login"
            type="text"
            value={formik.values.text}
            onChange={formik.handleChange}
            error={formik.touched.text && Boolean(formik.errors.text)}
            helperText={formik.touched.text && formik.errors.text}
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
            Submit
          </Button>
          <Link component={RouterLink} to="/registration">
            Don&apos;t have an account? Register
          </Link>
        </FormStyles>
      </FormContainerStyles>
    </>
  );
};

export default UserAuthPage;
