import React, { useState } from 'react';

import {
  Avatar,
  Box,
  Container,
  IconButton,
  Menu,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';

import { useTranslation } from 'react-i18next';

import { pagesTotal, pagesAuth } from '../../../consts/consts';

import { ButtonLink, MenuPointLink } from './buttonsLink';

import { CustomizedFlex } from '../../../styledComponents';

import { useAppDispatch } from '../../../reduxUsers/hook/reduxCustomHook';
import { logout } from '../../../reduxUsers/slices/authSlice';
import { updateAddNewBoard } from '../../../reduxUsers/actions/boardActions';
import { setModalState } from '../../../reduxUsers/actions/modalActions';
import { isOpenEdit } from '../../../reduxUsers/slices/profileSlice';

function HeaderContent() {
  const { i18n, t } = useTranslation();
  const langLocal = localStorage.getItem('I18N_LANGUAGE')
    ? localStorage.getItem('I18N_LANGUAGE')
    : 'EN';
  const [langCurrent, setLangCurrent] = useState(langLocal);

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const dispatch = useAppDispatch();

  const handleCloseNavMenu = (pageName?: string) => {
    if (pageName === 'NEW BOARD') {
      dispatch(updateAddNewBoard(true));
      dispatch(setModalState({ isOpen: true, type: 'ADD_BOARD' }));
    }
    setAnchorElNav(null);
  };

  const logoutProfile = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (event.currentTarget.id === 'LOG OUT') {
      dispatch(logout());
      dispatch(isOpenEdit({ openEdit: false }));
    }
  };

  const handleChangeLang = () => {
    const newLang = langCurrent === 'en' ? 'ru' : 'en';
    i18n.changeLanguage(newLang);
    localStorage.setItem('I18N_LANGUAGE', newLang);
    setLangCurrent(newLang);
  };

  return (
    <Container maxWidth="xl" id="back-to-top-anchor">
      <Toolbar disableGutters>
        <CustomizedFlex iconAndButton>
          <HomeIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            {t('homePage')}
          </Typography>
        </CustomizedFlex>
        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={() => handleCloseNavMenu()}
            sx={{
              display: { xs: 'block', md: 'none' },
            }}
          >
            {pagesTotal.map((page) => (
              <MenuPointLink key={page.name} page={page} handleCloseNavMenu={handleCloseNavMenu} />
            ))}
            {pagesAuth.map((page) => (
              <MenuPointLink
                key={page.name}
                page={page}
                handleCloseNavMenu={handleCloseNavMenu}
                logoutProfile={logoutProfile}
              />
            ))}
          </Menu>
        </Box>
        <HomeIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
        <Typography
          variant="h6"
          noWrap
          component="a"
          href=""
          sx={{
            mr: 2,
            display: { xs: 'flex', md: 'none' },
            flexGrow: 1,
            fontFamily: 'monospace',
            fontWeight: 700,
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          {t('homePage')}
        </Typography>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', justifyContent: 'center' } }}>
          {pagesTotal.map((page) => (
            <ButtonLink
              page={page}
              handleCloseNavMenu={() => handleCloseNavMenu(page.name)}
              key={page.name}
            />
          ))}
        </Box>
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleChangeLang} sx={{ p: 0, textAlign: 'center' }}>
              <Avatar sx={{ bgcolor: 'transparent' }}>{langCurrent}</Avatar>
            </IconButton>
          </Tooltip>
        </Box>
        <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex', justifyContent: 'center' } }}>
          {pagesAuth.map((page) => (
            <ButtonLink
              page={page}
              handleCloseNavMenu={() => handleCloseNavMenu(page.name)}
              logoutProfile={logoutProfile}
              key={page.name}
            />
          ))}
        </Box>
      </Toolbar>
    </Container>
  );
}
export default HeaderContent;
