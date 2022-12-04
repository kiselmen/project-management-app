import Button from '@mui/material/Button';

interface IStyledButtonAddTask {
  children: React.ReactNode;
  func: (_id: string) => void;
  _id: string;
}

const StyledButtonAddTask = (props: IStyledButtonAddTask) => (
  <Button
    component="div"
    variant="contained"
    sx={{
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      mt: 1,
      borderRadius: 4,
      textTransform: 'none',
    }}
    onMouseUp={() => props.func(props._id)}
  >
    {props.children}
  </Button>
);

export default StyledButtonAddTask;
