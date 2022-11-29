import { Button, Card, CardActions, CardContent } from '@mui/material';
import userImage from '../../assets/no_photo.png';
import { UserPicture } from './CurrentUserData.styles';
import { CustomListItem } from './CurrentUserData/CustomListItem';
import { stateUser } from '../../reduxUsers/slices/authSlice';
import { stateProfile } from '../../reduxUsers/slices/profileSlice';
import { useSelector } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';
import { DeleteModalWindow } from './CurrentUserData/DeleteModalWIndow';
import { deleteUser } from '../../reduxUsers/actions/authActions';
import { isOpenEdit } from '../../reduxUsers/slices/profileSlice';
import { useAppDispatch } from '../../reduxUsers/hook/reduxCustomHook';
import CreateForm from '../../components/forms/CreateForm';
import { useTranslation } from 'react-i18next';
import { setModalState } from '../../reduxUsers/actions/modalActions';

export const CurrentUserData = () => {
  const { t } = useTranslation();
  const userState = useSelector(stateUser);
  const { name, login } = userState;

  const profileEditState = useSelector(stateProfile);
  const { openEdit } = profileEditState;

  const dispatch = useAppDispatch();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpenEdit = () => {
    if (!openEdit) {
      dispatch(isOpenEdit({ openEdit: true }));
    } else {
      dispatch(isOpenEdit({ openEdit: false }));
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    dispatch(setModalState({ isOpen: true, type: 'LOADING' }));
    await dispatch(deleteUser());
    setOpen(false);
  };

  return (
    <>
      <Card sx={{ maxWidth: 320, width: '100%', mt: 3 }}>
        <UserPicture src={userImage} alt="user-photo" />
        <CardContent>
          <CustomListItem {...{ primary: `${t('Username')}:`, secondary: name! }} />
          <CustomListItem {...{ primary: `${t('Login')}:`, secondary: login! }} />
        </CardContent>
        <CardActions sx={{ justifyContent: 'center' }}>
          <Button
            onClick={handleClickOpen}
            size="small"
            variant="outlined"
            startIcon={<DeleteIcon />}
          >
            {t('Delete user')}
          </Button>
          <Button
            onClick={handleClickOpenEdit}
            size="small"
            variant="contained"
            startIcon={<EditIcon />}
          >
            {t('Edit user')}
          </Button>
        </CardActions>
        <DeleteModalWindow open={open} handleClose={handleClose} handleDelete={handleDelete} />
      </Card>
      {openEdit && <CreateForm />}
    </>
  );
};
