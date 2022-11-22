import { Dialog, DialogTitle, DialogActions, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

export const DeleteModalWindow = ({
  open,
  handleClose,
  handleDelete,
}: {
  open: boolean;
  handleClose: () => void;
  handleDelete: () => void;
}) => {
  const { t } = useTranslation();
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {t('Are you sure you want to delete the user?')}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>{t('No')}</Button>
          <Button onClick={handleDelete}>{t('Yes')}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
