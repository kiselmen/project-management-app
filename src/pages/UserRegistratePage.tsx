import CreateForm from '../components/forms/CreateForm';
import { useSelector } from 'react-redux';
import { state } from '../reduxUsers/slices/authSlice';
import { Navigate } from 'react-router-dom';

const UserRegistratePage = () => {
  const stateIsLogin = useSelector(state);
  const isLogin = stateIsLogin.isAuth;
  if (isLogin) {
    return <Navigate to="/boards" />;
  }
  return <CreateForm />;
};

export default UserRegistratePage;
