import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import {
  BoardsListPage,
  PageNotFound,
  ProfilePage,
  SelectedBordPage,
  UserAuthPage,
  UserRegistratePage,
  WelcomePage,
} from '../../pages';

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route index element={<Navigate to="/boards" replace />} />;
      <Route path="/boards" element={<BoardsListPage />} />
      <Route path="/board" element={<SelectedBordPage />} />
      <Route path="/registration" element={<UserRegistratePage />} />
      <Route path="/authorization" element={<UserAuthPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
      <Route path="/404" element={<PageNotFound />} />
    </Routes>
  );
}

export default Routing;
