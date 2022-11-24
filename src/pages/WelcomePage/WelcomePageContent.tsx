import { Button, Typography, Link as MuiLink, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import {
  FirstSection,
  LeftContentWrapper,
  BtnsWrapper,
  linkStyle,
  SecondSection,
  ThirdSection,
  CardContainer,
  paragraphStyle,
} from './WelcomePageContent.styles';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { useSelector } from 'react-redux';
import { stateUser } from '../../reduxUsers/slices/authSlice';
import { WelcomePageCard } from './WelcomePageContent/WelcomePageCard';
import { cardData } from './WelcomePageContent/cardData';
import { WelcomePageDevCard } from './WelcomePageContent/WelcomePageDevCard';
import { developers } from '../../consts/consts';

export const WelcomePageContent = () => {
  const userState = useSelector(stateUser);
  const isLogin = userState.isAuth;

  return (
    <>
      <FirstSection>
        <LeftContentWrapper>
          <Typography component="p" variant="h6" sx={paragraphStyle}>
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
      <SecondSection>
        <Typography variant="h6" component="p" sx={paragraphStyle}>
          This project was developed as part of the{' '}
          <MuiLink href="https://rs.school/react/" target="_blank" rel="noreferrer">
            <i>RSSchool React training course</i>
          </MuiLink>
          .
          <br />
          <b>RS School</b> - free-of-charge and community-based education program conducted by The
          Rolling Scopes developer community since 2013. Everyone can study at RS School, regardless
          of age, professional employment, or place of residence. The mentors and trainers of our
          school are front-end and javascript developers from different companies and countries.
        </Typography>
        <Box sx={{ width: '100%' }}>
          <Typography sx={paragraphStyle}>
            <b>The following technologies are used in the project:</b>
          </Typography>
          <CardContainer>
            {cardData.map((item) => (
              <WelcomePageCard key={item.id} {...item} />
            ))}
          </CardContainer>
        </Box>
      </SecondSection>
      <ThirdSection>
        <Typography sx={paragraphStyle}>
          <b>The following developers worked on the project:</b>
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row-reverse',
            justifyContent: 'center',
            columnGap: '1rem',
            rowGap: '1rem',
            flexWrap: 'wrap',
          }}
        >
          {developers.map((card, idx) => (
            <WelcomePageDevCard key={idx} {...card} />
          ))}
        </Box>
      </ThirdSection>
    </>
  );
};
