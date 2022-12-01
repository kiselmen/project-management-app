import Button from '@mui/material/Button';

interface IMyStyledButton {
  children: React.ReactNode;
  func: () => void;
}

const MyStyledButtonBack = (props: IMyStyledButton) => (
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

export default MyStyledButtonBack;
