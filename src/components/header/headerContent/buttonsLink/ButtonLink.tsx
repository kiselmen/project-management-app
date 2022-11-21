import * as React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Button, Typography } from '@mui/material';

import LoginIcon from '@mui/icons-material/Login';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import QueueSharpIcon from '@mui/icons-material/QueueSharp';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import ManageAccountsSharpIcon from '@mui/icons-material/ManageAccountsSharp';
import LogoutIcon from '@mui/icons-material/Logout';

import { CustomizedFlex } from '../../../../styledComponents';

import { pagesTotal, pagesAuth, IConstPageData } from '../../../../consts/consts';

import { stateUser } from '../../../../reduxUsers/slices/authSlice';

interface IPageName {
  page: string;
}

interface IButtonLinkProps {
  page: IConstPageData;
  handleCloseNavMenu: () => void;
  logoutProfile?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

const PageIcon = (props: IPageName) => {
  const { page } = props;
  const iconBoards = page === pagesTotal[0].name ? true : false;
  const iconNewBoard = page === pagesTotal[1].name ? true : false;
  const iconProfile = page === pagesTotal[2].name ? true : false;
  const iconLogin = page === pagesAuth[0].name ? true : false;
  const iconSignUp = page === pagesAuth[1].name ? true : false;
  const iconLogOut = page === pagesAuth[2].name ? true : false;
  return (
    <>
      {iconBoards && <ListAltOutlinedIcon />}
      {iconNewBoard && <QueueSharpIcon />}
      {iconProfile && <ManageAccountsSharpIcon />}
      {iconLogin && <LoginIcon />}
      {iconSignUp && <PersonAddAltIcon />}
      {iconLogOut && <LogoutIcon />}
    </>
  );
};

const ButtonLink = (props: IButtonLinkProps) => {
  const { t } = useTranslation();
  const stateIsLogin = useSelector(stateUser);
  const isLogin = stateIsLogin.isAuth;
  const { page, handleCloseNavMenu, logoutProfile } = props;
  const visible = isLogin === page.isLoggin ? true : false;

  if (visible) {
    return (
      <Link
        id={page.name}
        onClick={logoutProfile}
        to={page.path}
        style={{ textDecoration: 'none' }}
      >
        <CustomizedFlex iconAndButton>
          <Button
            variant="contained"
            onClick={handleCloseNavMenu}
            sx={{
              my: 2,
              textTransform: 'none',
              alignItems: 'flex-end',
            }}
          >
            <PageIcon page={page.name} />
            <Typography variant="h6">{t(page.name)}</Typography>
          </Button>
        </CustomizedFlex>
      </Link>
    );
  } else {
    return null;
  }
};

export default ButtonLink;
