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
import { useTranslation } from 'react-i18next';

const CreateForm = () => {
  const { t } = useTranslation();
  const stateIsLogin = useSelector(stateUser);
  const isLogin = stateIsLogin.isAuth;
  const location = useLocation();
  const currentUrl = location.pathname === '/registration';
  const profileUrl = location.pathname === '/profile';

  const dataFormValidation = {
    auth: {
      login: yup.string().required(t('Please enter your login') as string),
      password: yup
        .string()
        .min(5, `${t('Minimum')} 5 ${t('characters')}`)
        .required(t('Please enter a valid password') as string),
    },
    authInitialValue: { login: '', password: '' },
    register: {
      name: yup
        .string()
        .min(3, `${t('Minimum')} 3 ${t('characters')}`)
        .max(15, `${t('Maximum')} 15 ${t('characters')}`)
        .required(t('Please enter your name') as string),
      login: yup
        .string()
        .min(2, `${t('Minimum')} 2 ${t('characters')}`)
        .max(15, `${t('Maximum')} 15 ${t('characters')}`)
        .required(t('Please enter your login') as string),
      password: yup
        .string()
        .min(5, `${t('Minimum')} 5 ${t('characters')}`)
        .required(t('Please enter a valid password') as string),
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

  const TitleForm = currentUrl
    ? (t('Sign up') as string)
    : !profileUrl
    ? t('Sign in')
    : t('Update profile');

  return (
    <>
      <FormContainerStyles>
        <Typography variant="h5" component="h2">
          {TitleForm}
        </Typography>
        <FormStyles onSubmit={formik.handleSubmit}>
          {(currentUrl || profileUrl) && (
            <TextField
              fullWidth
              id="name"
              name="name"
              label={t('Name')}
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
            label={t('Login')}
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
            label={t('Password')}
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button color="primary" variant="contained" fullWidth type="submit">
            {currentUrl ? t('Register') : !profileUrl ? t('Submit') : t('Update')}
          </Button>
        </FormStyles>
        {!currentUrl && !profileUrl ? (
          <Link component={RouterLink} to="/registration">
            {t('Dont have an account? Register')}
          </Link>
        ) : profileUrl ? (
          ''
        ) : (
          <Link component={RouterLink} to="/authorization">
            {t('Already have an account? Login')}
          </Link>
        )}
      </FormContainerStyles>
    </>
  );
};

export default CreateForm;
