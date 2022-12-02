import Box from '@mui/material/Box';

interface IStyledBoxColumn {
  children: React.ReactNode;
}

const StyledBoxColumn = (props: IStyledBoxColumn) => (
  <Box
    sx={{
      bgcolor: 'primary.main',
      width: '280px',
      maxHeight: 'calc(100vh - 320px)',
      margin: '15px',
      borderRadius: '16px',
      position: 'relative',
    }}
  >
    {props.children}
  </Box>
);

export default StyledBoxColumn;
