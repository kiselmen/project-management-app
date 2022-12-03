import ImageList from '@mui/material/ImageList';
import { styled, experimental_sx as sx } from '@mui/system';

const StyledMuiImageListColumns = styled(ImageList)(
  sx({
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'nowrap',
    mt: '0',
    mb: '0',
    overflowY: 'hidden',
    overflowAnchor: 'none',
    minWidth: '95%',
    height: {
      xs: 'calc(100vh - 330px)',
      sm: 'calc(100vh - 320px)',
      md: 'calc(100vh - 290px)',
    },
    // 'calc(100vh - 340px)',
  })
);
export default StyledMuiImageListColumns;
