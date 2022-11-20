import { Container } from '@mui/material';
import { CurrentUserData } from './ProfilePage/CurrentUserData';

function ProfilePage() {
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
        <CurrentUserData />
      </Container>
    </>
  );
}

export default ProfilePage;
