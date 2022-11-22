import { Container } from '@mui/material';
import { useSelector } from 'react-redux';
import { SuccessMessage } from '../components/successMessage/SuccessMssage';
import { CurrentUserData } from './ProfilePage/CurrentUserData';
import { stateProfile } from '../reduxUsers/slices/profileSlice';
import { useTranslation } from 'react-i18next';

function ProfilePage() {
  const { t } = useTranslation();
  const profileState = useSelector(stateProfile);
  const { updateSuccess } = profileState;
  return (
    <>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {updateSuccess && <SuccessMessage text={t('Updated Successfully')} />}
        <CurrentUserData />
      </Container>
    </>
  );
}

export default ProfilePage;
