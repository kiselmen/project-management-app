import { Dialog, DialogTitle, DialogActions, Button } from '@mui/material';

export const DeleteModalWindow = ({
  open,
  handleClose,
  handleDelete,
}: {
  open: boolean;
  handleClose: () => void;
  handleDelete: () => void;
}) => {
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Are you sure you want to delete the user?'}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={handleDelete}>Yes</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
