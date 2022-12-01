import Typography from '@mui/material/Typography';

interface IStyledTypographyBoardTitle {
  children: React.ReactNode;
  func: () => void;
}

const StyledTypographyBoardTitle = (props: IStyledTypographyBoardTitle) => (
  <Typography
    variant="h5"
    color="primary"
    fontWeight={700}
    sx={{
      bgcolor: 'secondary.main',
      p: '5px 20px 5px 20px',
      borderRadius: 4,
      cursor: 'pointer',
      overflow: 'hidden',
      whiteSpace: 'pre-line',
      flexGrow: '1',
      maxHeight: '80px',
      textOverflow: 'ellipsis',
      maxWidth: {
        xs: 'calc(100vw - 180px)',
        sm: 'calc(100vw - 200px)',
        md: '900px',
      },
    }}
    onClick={props.func}
  >
    {props.children}
  </Typography>
);

export default StyledTypographyBoardTitle;
