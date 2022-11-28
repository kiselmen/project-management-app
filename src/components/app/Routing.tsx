import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';

import {
  BoardsListPage,
  PageNotFound,
  ProfilePage,
  SelectedBordPage,
  UserAuthPage,
  UserRegistratePage,
  WelcomePage,
} from '../../pages';
import { stateUser, checkLocal } from '../../reduxUsers/slices/authSlice';

const Redirect = ({ children }: { children: JSX.Element }) => {
  const stateIsLogin = useSelector(stateUser);
  const isLogin = stateIsLogin.isAuth;
  if (!isLogin) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
};

function Routing() {
  // const stateIsLogin = useSelector(stateUser);
  // const isLogin = stateIsLogin.isAuth;
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  // React.useEffect(() => {
  //   dispatch(checkLocal());
  //   if (!isLogin) {
  //     navigate('/');
  //   }
  // }, [isLogin]);

  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route
        path="/boards"
        element={
          <Redirect>
            <BoardsListPage />
          </Redirect>
        }
      />
      <Route
        path="/board/:id"
        element={
          <Redirect>
            <SelectedBordPage />
          </Redirect>
        }
      />
      <Route path="/registration" element={<UserRegistratePage />} />
      <Route path="/authorization" element={<UserAuthPage />} />
      <Route
        path="/profile"
        element={
          <Redirect>
            <ProfilePage />
          </Redirect>
        }
      />
      <Route path="*" element={<Navigate to="/404" replace />} />
      <Route path="/404" element={<PageNotFound />} />
    </Routes>
  );
}

export default Routing;
