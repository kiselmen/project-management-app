import { Container } from '@mui/material';
import { styled, experimental_sx as sx } from '@mui/system';

const StyledMuiContainerAppMain = styled(Container)(
  sx({
    padding: { xs: 0, md: 0 },
    minHeight: {
      xs: 'calc(100vh - 152px)',
      sm: 'calc(100vh - 106px)',
      md: 'calc(100vh - 110px)',
    },
    overflow: 'auto',
  })
);
export default StyledMuiContainerAppMain;
