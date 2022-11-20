import * as React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { MenuItem, Typography } from '@mui/material';

import { IConstPageData } from '../../../../consts/consts';

import { state } from '../../../../reduxUsers/slices/authSlice';

interface IMenuPointLinkProps {
  page: IConstPageData;
  handleCloseNavMenu: () => void;
  logoutProfile?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

const MenuPointLink = (props: IMenuPointLinkProps) => {
  const { t } = useTranslation();
  const stateIsLogin = useSelector(state);
  const isLogin = stateIsLogin.isAuth;
  const { page, handleCloseNavMenu, logoutProfile } = props;
  const visible = isLogin === page.isLoggin ? true : false;

  if (visible) {
    return (
      <MenuItem key={page.name} onClick={handleCloseNavMenu}>
        <Link
          id={page.name}
          onClick={logoutProfile}
          to={page.path}
          style={{ textDecoration: 'none' }}
        >
          <Typography color="primary" textAlign="center">
            {t(page.name)}
          </Typography>
        </Link>
      </MenuItem>
    );
  } else {
    return null;
  }
};

export default MenuPointLink;
