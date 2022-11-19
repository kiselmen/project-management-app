import { Icon, Link, Stack, Divider, Box, CssBaseline, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { ReactComponent as RssIcon } from '../../assets/logo-rsschool3.svg';
import GitHubIcon from '@mui/icons-material/GitHub';
import { CustomizedFlex } from '../../styledComponents';
import { developers, IDeveloper } from '../../consts/consts';

export const Footer = () => {
  return (
    <>
      <CssBaseline />
      <Box component="footer">
        <Container
          maxWidth="xl"
          sx={{
            backgroundColor: 'secondary.main',
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            pt: 1,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Link href="https://rs.school/react/" target="_blank" rel="noreferrer">
              <Icon
                color="error"
                component={RssIcon}
                sx={{ width: '60px', fill: '#223059', textDecoration: 'none' }}
              />
            </Link>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              divider={<Divider orientation="vertical" flexItem />}
              spacing={{ xs: 0.5, sm: 2 }}
            >
              {developers.map((developer: IDeveloper) => (
                <Link
                  key={developer.name}
                  href={developer.path}
                  target="_blank"
                  rel="noreferrer"
                  sx={{ textDecoration: 'none' }}
                >
                  <CustomizedFlex iconAndButton>
                    <GitHubIcon />
                    {developer.name}
                  </CustomizedFlex>
                </Link>
              ))}
            </Stack>
            <Typography color="primary">Ⓒ 2022 React</Typography>
          </Box>
        </Container>
      </Box>
    </>
  );
};
