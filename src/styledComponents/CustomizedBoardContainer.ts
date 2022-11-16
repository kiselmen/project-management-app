import { Container } from '@mui/material';
import { styled } from '@mui/material/styles';

const CustomizedBoardContainer = styled(Container)`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  width: 100%;
  background-color: white;
  min-height: calc(100vh - 180px);
`;

export default CustomizedBoardContainer;
