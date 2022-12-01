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
import { useTranslation } from 'react-i18next';

export const WelcomePageContent = () => {
  const userState = useSelector(stateUser);
  const isLogin = userState.isAuth;
  const { t } = useTranslation();

  return (
    <>
      <FirstSection>
        <LeftContentWrapper>
          <Typography component="p" variant="h6" sx={paragraphStyle}>
            {t('The perfect place to organize and manage your tasks.')}
            {t('Start acting yourself or distribute the load among colleagues.')}{' '}
            {t('Our motto is: ')} &quot;{t('Do it right on time!')}&quot;
          </Typography>
          <BtnsWrapper>
            {isLogin ? (
              <Link to="/boards" style={linkStyle}>
                <Button size="small" variant="outlined">
                  {t('Get Started')}
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/authorization" style={linkStyle}>
                  <Button size="small" variant="outlined" startIcon={<LoginIcon />}>
                    {t('Sign in')}
                  </Button>
                </Link>
                <Link to="/registration" style={linkStyle}>
                  <Button size="small" variant="outlined" startIcon={<PersonAddAltIcon />}>
                    {t('Sign up')}
                  </Button>
                </Link>
              </>
            )}
          </BtnsWrapper>
        </LeftContentWrapper>
      </FirstSection>
      <SecondSection>
        <Typography variant="h6" component="p" sx={paragraphStyle}>
          {t('This project was developed as part of the')}{' '}
          <MuiLink href="https://rs.school/react/" target="_blank" rel="noreferrer">
            <i>{t('RSSchool React training course')}</i>
          </MuiLink>
          .
          <br />
          <b>RS School</b>
          {t(
            '- free-of-charge and community-based education program conducted by The Rolling Scopes developer community since 2013.'
          )}
          {t(
            'Everyone can study at RS School, regardless of age, professional employment, or place of residence.'
          )}
          {t(
            'The mentors and trainers of our school are front-end and javascript developers from different companies and countries.'
          )}
        </Typography>
        <Box sx={{ width: '100%' }}>
          <Typography sx={paragraphStyle}>
            <b>{t('The following technologies are used in the project:')}</b>
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
          <b>{t('The following developers worked on the project:')}</b>
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
