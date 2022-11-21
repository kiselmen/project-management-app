import { Alert } from '@mui/material';

export const SuccessMessage = ({ text }: { text: string }) => {
  return (
    <>
      <Alert
        sx={{ position: 'fixed', top: '68px', right: 0 }}
        variant="outlined"
        severity="success"
      >
        {text}
      </Alert>
    </>
  );
};
