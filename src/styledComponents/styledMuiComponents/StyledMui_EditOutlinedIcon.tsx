import styled from 'styled-components';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

const StyledMui_EditOutlinedIcon = styled(EditOutlinedIcon)(
  ({ theme }) => `
    fill: ${theme.palette.secondary.main};
    color: ${theme.palette.secondary.main};
    cursor: pointer;
    `
);

export default StyledMui_EditOutlinedIcon;
