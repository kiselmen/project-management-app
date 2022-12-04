import { Container } from '@mui/material';
import { styled } from '@mui/material/styles';

const CustomizedBoardContainer = styled(Container)`
  display: flex;
  /* justify-content: flex-start; */
  flex-direction: column;
  /* width: 100%; */
  /* background-color: white; */
  /* height: 100%; */
  height: {
    xs: calc(100vh - 152px);
    sm: calc(100vh - 106px);
    md: calc(100vh - 110px);
  }
  /* height: {
    xs: calc(100vh - 156px);
    md: calc(100vh - 101px);
  } */
  /* padding: 0; */
`;

export default CustomizedBoardContainer;
