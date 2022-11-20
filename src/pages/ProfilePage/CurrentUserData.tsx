import { Button, Card, CardActions, CardContent } from '@mui/material';
import userImage from '../../assets/no_photo.png';
import { UserPicture } from './CurrentUserData.styles';
import { CustomListItem } from './CurrentUserData/CustomListItem';
import { state } from '../../reduxUsers/slices/authSlice';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';
import { DeleteModalWindow } from './CurrentUserData/DeleteModalWIndow';
import { deleteUser } from '../../reduxUsers/actions/authActions';
import { useAppDispatch } from '../../reduxUsers/hook/reduxCustomHook';

export const CurrentUserData = () => {
  const userState = useSelector(state);
  const { name, login } = userState;
  const dispatch = useAppDispatch();
  const isLogin = userState.isAuth;

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    await dispatch(deleteUser());
    setOpen(false);
  };

  if (!isLogin) {
    return <Navigate to="/boards" />;
  }

  return (
    <>
      <Card sx={{ maxWidth: 320, width: '100%' }}>
        <UserPicture src={userImage} />
        <CardContent>
          <CustomListItem {...{ primary: 'Username:', secondary: name! }} />
          <CustomListItem {...{ primary: 'Login:', secondary: login! }} />
        </CardContent>
        <CardActions sx={{ justifyContent: 'center' }}>
          <Button
            onClick={handleClickOpen}
            size="small"
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
          >
            Delete user
          </Button>
          <Button size="small" variant="contained" color="success" startIcon={<EditIcon />}>
            Edit user
          </Button>
        </CardActions>
        <DeleteModalWindow open={open} handleClose={handleClose} handleDelete={handleDelete} />
      </Card>
    </>
  );
};
