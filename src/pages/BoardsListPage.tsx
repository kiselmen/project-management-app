import { CustomizedBoardContainer, CustomizedFlex, CustomizedH1 } from '../styledComponents';
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
  }, [allBoards]);

  const loadBoards = async () => {
    await dispatch(getAllUserBoards(_id as string, token as string));
  };

  return (
    <CustomizedBoardContainer>
      <CustomizedFlex boardHeader>
        <CustomizedH1>BOARDS</CustomizedH1>
        <Button variant="outlined" size="small" onClick={setModalStateToOpen}>
          Add
        </Button>
      </CustomizedFlex>
      <CustomizedFlex boardBody>
        <div>fdsdfsdfs</div>
        <div>fdsdfsdfs</div>
      </CustomizedFlex>
    </CustomizedBoardContainer>
  );
};

export default BoardsListPage;
