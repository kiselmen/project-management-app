import { createTheme } from '@mui/material/styles';
import CentraNo2 from '../../assets/fonts/CentraNo2.ttf';

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    link: true;
  }
}

const theme = createTheme({
  palette: {
    // type: 'light',
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
        },
        MuiAppBar: {
          colorInherit: {
            backgroundColor: '#689f38',
            color: '#fff',
          },
        },
        // MuiContainer: {
        //   variants: [
        //     {
        //       props: { variant: 'contained' },
        //       style: {
        //         // position: 'absolute',
        //         // zIndex: 1,
        //         // top: -30,
        //         // left: 0,
        //         // right: 0,
        //         // margin: '0 auto',
        //         // display: 'flex',
        //         // alignItems: 'center',
        //         // background: '#BF6B04',
        //         // flexWrap: 'wrap',
        //         // rowGap: '10px',
        //         // padding: '15px 0px',
        //       },
        //     },
        //   ],
        // },
        // MuiButton: {
        //   // variants: [
        //   //   {
        //   //     props: { variant: 'contained' },
        //   //     style: {
        //   //       // color: '#fff',
        //   //       fontWeight: 'bold',
        //   //     },
        //   //   },
        //   // ],
        // },
      },
    },
  },
  // props: {
  //   MuiAppBar: {
  //     color: 'inherit',
  //   },
  // },
});

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#fff',
//       // contrastText: '#212121',
//     },
//     secondary: {
//       main: 'rgb(222 67 51)',
//       // contrastText: '#212121',
//     },
//   },
//   typography: {
//     fontFamily: [
//       'CentraNo2',
//       '-apple-system',
//       'BlinkMacSystemFont',
//       '"Segoe UI"',
//       'Roboto',
//       '"Helvetica Neue"',
//       'Arial',
//       'sans-serif',
//       '"Apple Color Emoji"',
//       '"Segoe UI Emoji"',
//       '"Segoe UI Symbol"',
//     ].join(','),
//   },
//   shape: {
//     borderRadius: 4,
//   },
//   components: {
//     MuiCssBaseline: {
//       styleOverrides: {
//         '@font-face': {
//           fontFamily: 'CentraNo2',
//           src: `url(${CentraNo2}) format("truetype")`,
//         },
//         body: {
//           fontSize: '3rem',
//           color: '#212121',
//         },
//       },
//     },
//     MuiButton: {
//       variants: [
//         {
//           props: { variant: 'link' },
//           style: {
//             color: 'rgb(41 13 10)',
//             fontWeight: 'bold',
//             ':hover': {
//               border: `2px solid rgb(222 67 51),`,
//             },
//           },
//         },
//       ],
//     },
//   },
// });

export default theme;
