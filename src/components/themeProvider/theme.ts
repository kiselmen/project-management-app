import { createTheme } from '@mui/material/styles';
import CentraNo2 from '../../assets/fonts/CentraNo2.ttf';

const theme = createTheme({
  palette: {
    primary: {
      main: '#223059',
    },
    secondary: {
      main: '#BF6B04',
    },
    success: {
      main: '#BF6B04',
    },
    background: {
      default: '#F0F2F0',
      paper: '#F0F2F0',
    },
    error: {
      main: '#73293D',
    },
    warning: {
      main: '#73293D',
    },
    info: {
      main: '#223059',
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
    h6: {
      fontSize: '1rem',
      fontWeight: 300,
      lineHeight: 1.24,
      letterSpacing: '0.04em',
    },
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
          // borderRadius: 4,
        },
        body: {
          maxWidth: 1200,
          marginRight: 'auto',
          marginLeft: 'auto',
          minHeight: 'calc(100vh - 110px)',
          flexGrow: 1,
          flexShrink: 0,
          position: 'relative',
          backGround: '#F0F2F0',
        },
        MuiAppBar: {
          colorInherit: {
            backgroundColor: '#689f38',
            color: '#fff',
          },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: { flexGrow: 1, flexShrink: 0, position: 'relative' },
      },
    },
  },
});

export default theme;
