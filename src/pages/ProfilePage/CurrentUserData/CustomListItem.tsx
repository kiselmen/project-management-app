import { Typography } from '@mui/material';

export const CustomListItem = ({ primary, secondary }: { primary: string; secondary: string }) => {
  return (
    <>
      <Typography variant="h6" component="p" sx={{ fontWeight: 'bold' }}>
        {primary}
        <Typography variant="h6" component="span">
          {' '}
          {secondary}
        </Typography>
      </Typography>
    </>
  );
};
