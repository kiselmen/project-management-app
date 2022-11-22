import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import {
  FirstSection,
  LeftContentWrapper,
  BtnsWrapper,
  linkStyle,
} from './WelcomePageContent.styles';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { useSelector } from 'react-redux';
import { stateUser } from '../../reduxUsers/slices/authSlice';

export const WelcomePageContent = () => {
  const userState = useSelector(stateUser);
  const isLogin = userState.isAuth;

  return (
    <>
      <FirstSection>
        <LeftContentWrapper>
          <Typography
            component="p"
            variant="h6"
            sx={{ fontSize: '1.5rem', textAlign: 'center', color: '#223059' }}
          >
            The perfect place to organize and manage your tasks. Start acting yourself or distribute
            the load among colleagues. Our motto is: &quot;Do it right on time!&quot;
          </Typography>
          <BtnsWrapper>
            {isLogin ? (
              <Link to="/boards" style={linkStyle}>
                <Button size="small" variant="outlined">
                  Get Started
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/authorization" style={linkStyle}>
                  <Button size="small" variant="outlined" startIcon={<LoginIcon />}>
                    Sign in
                  </Button>
                </Link>
                <Link to="/registration" style={linkStyle}>
                  <Button size="small" variant="outlined" startIcon={<PersonAddAltIcon />}>
                    Sign up
                  </Button>
                </Link>
              </>
            )}
          </BtnsWrapper>
        </LeftContentWrapper>
      </FirstSection>
    </>
  );
};
