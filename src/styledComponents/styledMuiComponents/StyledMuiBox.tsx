import { Box } from '@mui/material';
import { styled, experimental_sx as sx } from '@mui/system';

const StyledMuiBoxSelectedBordPageMain = styled(Box)(
  sx({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: {
      xs: 'calc(100vh - 190px)',
      sm: 'calc(100vh - 176px)',
      md: 'calc(100vh - 145px)',
    },
  })
);
export { StyledMuiBoxSelectedBordPageMain };
