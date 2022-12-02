import Typography from '@mui/material/Typography';

interface IStyledTypographyColumnTitleText {
  children: React.ReactNode;
  _id: string;
  func: (e: React.MouseEvent<HTMLHeadingElement, MouseEvent>, _id: string) => void;
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
    onMouseUp={(e) => props.func(e, props._id)}
  >
    {props.children}
  </Typography>
);

export default StyledTypographyColumnTitleText;
