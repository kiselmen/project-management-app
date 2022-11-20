import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const CustomisedMuiButton = styled(Button)(
  ({ theme }) => `
  color: ${theme.palette.primary.contrastText};
  `
);

export default CustomisedMuiButton;
