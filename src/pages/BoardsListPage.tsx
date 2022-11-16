import { CustomizedBoardContainer, CustomizedFlex, CustomizedH1 } from '../styledComponents';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { setModalState } from '../reduxUsers/actions/modalActions';
import { getAllUserBoards } from '../reduxUsers/actions/boardActions';
import { useAppDispatch } from '../reduxUsers/hook/reduxCustomHook';
import { useEffect } from 'react';
import { state as boardState } from '../reduxUsers/slices/boardSlice';
import { useSelector } from 'react-redux';

const BoardsListPage = () => {
  const dispatch = useAppDispatch();

  const token = localStorage.getItem('token');
  const _id = localStorage.getItem('userId');
  const { allBoards } = useSelector(boardState);

  const setModalStateToOpen = () => {
    dispatch(setModalState({ isOpen: true, type: 'ADD_BOARD' }));
  };

  useEffect(() => {
    console.log('Запрашиввем все доски юзера');
    loadBoards();
  }, []);

  const loadBoards = async () => {
    await dispatch(getAllUserBoards(_id as string, token as string));
  };

  // const style = {
  //   display: 'block',
  //   transform: 'translate(-50%, -50%)',
  //   width: 400,
  //   bgcolor: 'gray',
  //   border: '2px solid #000',
  //   boxShadow: 24,
  //   p: 4,
  // };

  const boardsRender = () => {
    const items = allBoards?.map(({ _id, title, subscribe }) => {
      return (
        <Box
          sx={{
            bgcolor: 'grey',
            width: '300px',
            hight: '300px',
            minHeight: '300px',
            margin: '15px',
            border: '1px solid black',
          }}
          key={_id}
        >
          <Typography id="transition-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
          <Typography id="transition-modal-description" sx={{ mt: 2 }}>
            {subscribe}
          </Typography>
        </Box>
      );
    });
    return items;
  };

  return (
    <CustomizedBoardContainer>
      <CustomizedFlex boardHeader>
        <CustomizedH1>BOARDS</CustomizedH1>
        <Button variant="outlined" size="small" onClick={setModalStateToOpen}>
          Add
        </Button>
      </CustomizedFlex>
      <CustomizedFlex boardBody>{boardsRender()}</CustomizedFlex>
    </CustomizedBoardContainer>
  );
};

export default BoardsListPage;
