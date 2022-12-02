import Button from '@mui/material/Button';

interface IStyledButton {
  children: React.ReactNode;
  func: () => void;
}

const StyledButtonBack = (props: IStyledButton) => (
  <Button
    variant="contained"
    sx={{
      borderRadius: 4,
    }}
    onClick={props.func}
  >
    {props.children}
  </Button>
);

export default StyledButtonBack;
