import { ListSubheader } from '@mui/material';
import { styled, experimental_sx as sx } from '@mui/system';

const StyledMuiListSubheader = styled(ListSubheader)(
  sx({
    textAlign: 'center',
    padding: '0.5rem 0.5rem 0.5rem 0.5rem',
    borderRadius: '0px 0px 16px 16px',
    display: 'flex',
    width: '100%',
    gap: '5px',
    position: 'fixed',
    top: '70px',
  })
);

export default StyledMuiListSubheader;
