import { Stack, Divider, useMediaQuery } from '@mui/material';
import Icon from '@mui/material/Icon';
import Link from '@mui/material/Link';
import { Container } from '@mui/system';
import { ReactComponent as RssIcon } from '../../assets/logo-rsschool3.svg';
import { SpanStyle } from './Footer.styles';

export const Footer = () => {
  const matches = useMediaQuery('(max-width:400px)');
  return (
    <>
      <Container
        component="footer"
        maxWidth={false}
        sx={{
          display: 'flex',
          alignItems: 'center',
          background: 'rgba(25, 118, 210, 0.4)',
          flexWrap: 'wrap',
          rowGap: '10px',
          padding: '15px 0px',
          justifyContent: `${matches ? 'center' : 'space-between'}`,
        }}
      >
        <Link href="https://rs.school/react/" target="_blank" rel="noreferrer">
          <Icon component={RssIcon} sx={{ width: '100px', height: '60px' }} />
        </Link>
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={2}
          sx={{ maxHeight: '30px', alignItems: 'center' }}
        >
          <Link href="https://github.com/Rarity110" target="_blank" rel="noreferrer">
            Tatiana
          </Link>
          <Link href="https://github.com/maxomeleneckii" target="_blank" rel="noreferrer">
            Max
          </Link>
          <Link href="https://github.com/kiselmen" target="_blank" rel="noreferrer">
            Vasiliy
          </Link>
        </Stack>
        <SpanStyle>Ⓒ 2022 React</SpanStyle>
      </Container>
    </>
  );
};
