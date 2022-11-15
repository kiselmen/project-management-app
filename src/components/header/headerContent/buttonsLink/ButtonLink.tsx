import * as React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Button } from '@mui/material';

import LoginIcon from '@mui/icons-material/Login';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import QueueSharpIcon from '@mui/icons-material/QueueSharp';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import ManageAccountsSharpIcon from '@mui/icons-material/ManageAccountsSharp';
import LogoutIcon from '@mui/icons-material/Logout';

import { CustomizedFlex } from '../../../../styledComponents';

import { pages, IConstPageData } from '../../../../consts/consts';
import { state } from '../../../../reduxUsers/slices/authSlice';

interface IPageName {
  page: string;
}

interface IButtonLinkProps {
  page: IConstPageData;
  handleCloseNavMenu: () => void;
}

const PageIcon = (props: IPageName) => {
  const { page } = props;
  const iconBoards = page === pages[0].name ? true : false;
  const iconNewBoard = page === pages[1].name ? true : false;
  const iconProfile = page === pages[2].name ? true : false;
  const iconLogin = page === pages[3].name ? true : false;
  const iconSignUp = page === pages[4].name ? true : false;
  const iconLogOut = page === pages[5].name ? true : false;
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
  const stateIsLogin = useSelector(state);
  const isLogin = stateIsLogin.isAuth;
  const { page, handleCloseNavMenu } = props;
  const visible = isLogin === page.isLoggin ? true : false;

  if (visible) {
    return (
      <Link to={page.path} style={{ textDecoration: 'none' }}>
        <CustomizedFlex iconAndButton>
          <PageIcon page={page.name} />
          <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
            {page.name}
          </Button>
        </CustomizedFlex>
      </Link>
    );
  } else {
    return null;
  }
};

export default ButtonLink;
