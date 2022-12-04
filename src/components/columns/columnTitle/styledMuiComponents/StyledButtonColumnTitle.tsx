import Button from '@mui/material/Button';

interface IStyledButtonColumnTitle {
  children: React.ReactNode;
}

const StyledButtonColumnTitle = (props: IStyledButtonColumnTitle) => (
  <Button
    component="div"
    variant="contained"
    sx={{
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      mb: 1,
      borderRadius: 4,
      textTransform: 'none',
    }}
  >
    {props.children}
  </Button>
);

export default StyledButtonColumnTitle;
