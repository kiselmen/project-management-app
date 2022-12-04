import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const Loading = () => {
  const { t } = useTranslation();
  return (
    <>
      <Typography id="transition-modal-title" variant="h6" component="h2">
        {t('Loading...')}
      </Typography>
    </>
  );
};

export default Loading;
