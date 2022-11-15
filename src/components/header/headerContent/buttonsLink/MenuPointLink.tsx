import * as React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';

import { IConstPageData } from '../../../../consts/consts';
import { RootState } from '../../../../reduxUsers/store';

interface IMenuPointLinkProps {
  page: IConstPageData;
}

const MenuPointLink = (props: IMenuPointLinkProps) => {
  const stateIsLogin = useSelector((state: RootState) => state.reduserIsLogin);
  const { isLogin } = stateIsLogin;
  const { page } = props;
  const visible = isLogin === page.isLoggin ? true : false;

  if (visible) {
    return (
      <Link to={page.path} style={{ textDecoration: 'none' }}>
        <Typography textAlign="center">{page.name}</Typography>
      </Link>
    );
  } else {
    return null;
  }
};

export default MenuPointLink;
