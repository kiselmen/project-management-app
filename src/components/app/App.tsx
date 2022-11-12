import React from 'react';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';

import {
  BoardsListPage,
  PageNotFound,
  SelectedBordPage,
  UserAuthPage,
  WelcomePage,
} from '../../pages';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route index element={<Navigate to="/boards" replace />} />;
        <Route path="/boards" element={<BoardsListPage />} />
        <Route path="/board" element={<SelectedBordPage />} />
        <Route path="/authorization" element={<UserAuthPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
        <Route path="/404" element={<PageNotFound />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
