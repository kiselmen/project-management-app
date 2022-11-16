import React, { useState } from 'react';

import {
  Avatar,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';

import { useTranslation } from 'react-i18next';

import { langs, pages } from '../../../consts/consts';

import ButtonLink from './buttonsLink/ButtonLink';
import MenuPointLink from './buttonsLink/MenuPointLink';

function HeaderContent() {
  const { i18n, t } = useTranslation();
  const langLocal = localStorage.getItem('I18N_LANGUAGE')
    ? localStorage.getItem('I18N_LANGUAGE')?.toUpperCase()
    : 'EN';
  const [langCurrent, setLangCurrent] = useState(langLocal);

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (lang: string) => {
    const newLang = lang.toLowerCase();
    setAnchorElUser(null);
    i18n.changeLanguage(newLang);
    localStorage.setItem('I18N_LANGUAGE', newLang);
    setLangCurrent(lang);
  };

  return (
    <Container maxWidth="xl">
      <Toolbar disableGutters>
        <HomeIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="/"
          sx={{
            mr: 2,
            display: { xs: 'none', md: 'flex' },
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.1rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          {t('homePage')}
        </Typography>

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
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: 'block', md: 'none' },
            }}
          >
            {pages.map((page) => (
              <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                <MenuPointLink page={page} />
              </MenuItem>
            ))}
          </Menu>
        </Box>
        <HomeIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
        <Typography
          variant="h5"
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
          {pages.map((page) => (
            <ButtonLink page={page} handleCloseNavMenu={handleCloseNavMenu} key={page.name} />
          ))}
        </Box>

        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton
              onClick={handleOpenUserMenu}
              sx={{ p: 0, color: 'white', textAlign: 'center' }}
            >
              <Avatar
                sx={{
                  bgcolor: 'transparent',
                  fontFamily: 'monospace',
                  fontWeight: 700,
                }}
              >
                {langCurrent}
              </Avatar>
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {langs.map((lang) => (
              <MenuItem key={lang} onClick={() => handleCloseUserMenu(lang)}>
                <Typography textAlign="center">{lang}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </Container>
  );
}
export default HeaderContent;
