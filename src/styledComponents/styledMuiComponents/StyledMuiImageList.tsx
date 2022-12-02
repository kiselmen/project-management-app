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
    minWidth: '95vw',
    height: 'calc(100vh - 150px)',
  })
);
export default StyledMuiImageListColumns;
