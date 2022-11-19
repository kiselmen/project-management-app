import { CustomizedBoardContainer, CustomizedFlex, CustomizedH1 } from '../styledComponents';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteForever';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { setModalState } from '../reduxUsers/actions/modalActions';
import {
  getAllUserBoards,
  deleteBoard,
  clearBoards,
  updateActiveBoardId,
  updateAddNewBoard,
} from '../reduxUsers/actions/boardActions';
import { useAppDispatch } from '../reduxUsers/hook/reduxCustomHook';
import { useEffect } from 'react';
import { state as boardState } from '../reduxUsers/slices/boardSlice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const BoardsListPage = () => {
  const dispatch = useAppDispatch();

  const token = localStorage.getItem('token');
  const _id = localStorage.getItem('userId');
  const { allBoards, addNewBoard } = useSelector(boardState);

  const navigate = useNavigate();

  useEffect(() => {
    onLoadBoards();
    return () => onClearState();
  }, []);

  const onClearState = () => {
    dispatch(clearBoards());
  };

  const onLoadBoards = async () => {
    dispatch(setModalState({ isOpen: true, type: 'LOADING' }));
    await dispatch(getAllUserBoards(_id as string, token as string));
    if (addNewBoard) {
      dispatch(setModalState({ isOpen: true, type: 'ADD_BOARD' }));
      dispatch(updateAddNewBoard(false));
    }
  };

  const onAddNewBoard = () => {
    dispatch(setModalState({ isOpen: true, type: 'ADD_BOARD' }));
  };

  const onRemoveBoard = async (e: React.MouseEvent<SVGSVGElement>, boardId: string) => {
    e.stopPropagation();
    dispatch(setModalState({ isOpen: true, type: 'LOADING' }));
    await dispatch(deleteBoard(boardId as string, token as string));
  };

  const onEditBoard = async (e: React.MouseEvent<SVGSVGElement>, boardId: string) => {
    e.stopPropagation();
    dispatch(updateActiveBoardId(boardId));
    dispatch(setModalState({ isOpen: true, type: 'EDIT_BOARD' }));
  };

  const onOpenBoard = (boardId: string) => {
    console.log('Navigate ', boardId);

    const point = '/board/' + boardId;
    navigate(point);
  };

  const boardsRender = () => {
    const items = allBoards?.map(({ _id, title, subscribe }) => {
      return (
        <Box
          onClick={() => onOpenBoard(_id as string)}
          sx={{
            bgcolor: 'grey',
            width: '300px',
            hight: '300px',
            minHeight: '300px',
            margin: '15px',
            border: '1px solid black',
            position: 'relative',
            cursor: 'pointer',
          }}
          key={_id}
        >
          <Typography id="transition-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
          <Typography id="transition-modal-description" sx={{ mt: 2 }}>
            {subscribe}
          </Typography>
          <EditOutlinedIcon
            onClick={(e) => onEditBoard(e, _id as string)}
            sx={{
              position: 'absolute',
              right: '20px',
              top: '20px',
              cursor: 'pointer',
            }}
          />
          <DeleteOutlinedIcon
            onClick={(e) => onRemoveBoard(e, _id as string)}
            sx={{
              position: 'absolute',
              right: '20px',
              bottom: '20px',
              cursor: 'pointer',
            }}
          />
        </Box>
      );
    });
    return items;
  };

  return (
    <CustomizedBoardContainer>
      <CustomizedFlex boardHeader>
        <CustomizedH1>BOARDS</CustomizedH1>
        <Button variant="outlined" size="small" onClick={onAddNewBoard}>
          Add
        </Button>
      </CustomizedFlex>
      <CustomizedFlex boardBody>{boardsRender()}</CustomizedFlex>
    </CustomizedBoardContainer>
  );
};

export default BoardsListPage;
