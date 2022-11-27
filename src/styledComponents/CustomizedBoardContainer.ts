import { Container } from '@mui/material';
import { styled } from '@mui/material/styles';

const CustomizedBoardContainer = styled(Container)`
  display: flex;
  /* justify-content: flex-start; */
  flex-direction: column;
  /* width: 100%; */
  /* background-color: white; */
  height: {
    xs: calc(100vh - 156px);
    md: calc(100vh - 101px);
  }
  /* padding: 0; */
`;

export default CustomizedBoardContainer;
