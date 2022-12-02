import Box from '@mui/material/Box';

interface IStyledBoxColumnInput {
  children: React.ReactNode;
}

const StyledBoxColumnInput = (props: IStyledBoxColumnInput) => (
  <Box
    component="div"
    sx={{
      display: 'flex',
      backgroundColor: 'white',
      width: '100%',
      borderRadius: '16px',
      cursor: 'pointer',
    }}
  >
    {props.children}
  </Box>
);

export default StyledBoxColumnInput;
