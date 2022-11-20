import styled from 'styled-components';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteForever';

const StyledMui_DeleteOutlinedIcon = styled(DeleteOutlinedIcon)(
  ({ theme }) => `
    fill: ${theme.palette.secondary.main};
    cursor: pointer;
    `
);

export default StyledMui_DeleteOutlinedIcon;
