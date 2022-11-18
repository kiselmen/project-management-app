import { orange, red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';
import CentraNo2 from '../../assets/fonts/CentraNo2.ttf';

const theme = createTheme({
  palette: {
    primary: {
      main: '#fff',
      // contrastText: '#212121',
    },
    secondary: {
      main: 'rgb(222 67 51)',
      // contrastText: '#212121',
    },
  },
  typography: {
    fontFamily: [
      'CentraNo2',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  shape: {
    borderRadius: 4,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '@font-face': {
          fontFamily: 'CentraNo2',
          src: `url(${CentraNo2}) format("truetype")`,
        },
        body: {
          fontSize: '3rem',
          color: '#212121',
        },
      },
    },
  },
});

export default theme;
