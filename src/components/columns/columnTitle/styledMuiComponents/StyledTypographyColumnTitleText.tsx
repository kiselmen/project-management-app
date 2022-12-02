import Typography from '@mui/material/Typography';

interface IStyledTypographyColumnTitleText {
  children: React.ReactNode;
  _id: string;
  func: () => void;
}

const StyledTypographyColumnTitleText = (props: IStyledTypographyColumnTitleText) => (
  <Typography
    id="transition-modal-title"
    variant="h5"
    textAlign="center"
    component="h2"
    flexGrow={1}
    sx={{
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      lineHeight: '1',
    }}
    onMouseUp={() => props.func()}
  >
    {props.children}
  </Typography>
);

export default StyledTypographyColumnTitleText;
