import { CustomizedBoardContainer, CustomizedFlex, CustomizedH1 } from '../styledComponents';
import { Box, Button, ImageList, ImageListItem, ImageListItemBar, Typography } from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteForever';
import { setModalState } from '../reduxUsers/actions/modalActions';
import { getAllUserBoards, deleteBoard, clearBoards } from '../reduxUsers/actions/boardActions';
import { useAppDispatch } from '../reduxUsers/hook/reduxCustomHook';
import { useEffect } from 'react';
import { state as boardState } from '../reduxUsers/slices/boardSlice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import InfoIcon from '@mui/icons-material/Info';
import BoardBackGround from '../assets/board.jpg';

const BoardsListPage = () => {
  const dispatch = useAppDispatch();

  const token = localStorage.getItem('token');
  const _id = localStorage.getItem('userId');
  const { allBoards } = useSelector(boardState);

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
  };

  const onAddNewBoard = () => {
    dispatch(setModalState({ isOpen: true, type: 'ADD_BOARD' }));
  };

  const onRemoveBoard = async (e: React.MouseEvent<SVGSVGElement>, boardId: string) => {
    e.stopPropagation();
    dispatch(setModalState({ isOpen: true, type: 'LOADING' }));
    await dispatch(deleteBoard(boardId as string, token as string));
  };

  const onOpenBoard = (boardId: string) => {
    const point = '/board/' + boardId;
    navigate(point);
  };

  const boardsRender = () => {
    return (
      <>
        <ImageListItem
          key={'newBoard'}
          sx={{ width: 250, alignContent: 'center', textAlign: 'center' }}
        >
          <img
            src={`${BoardBackGround}?w=248&fit=crop&auto=format`}
            srcSet={`${BoardBackGround}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt="picture"
            loading="lazy"
          />
        </ImageListItem>
        {allBoards?.map(({ _id, title, subscribe }) => (
          <ImageListItem
            key={_id}
            sx={{ width: 250, height: 150 }}
            onClick={() => onOpenBoard(_id as string)}
          >
            <img
              src={`${BoardBackGround}?w=248&fit=crop&auto=format`}
              srcSet={`${BoardBackGround}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt="picture"
              loading="lazy"
            />
            <ImageListItemBar
              title={title}
              subtitle={subscribe}
              actionIcon={
                <DeleteOutlinedIcon
                  onClick={(e) => onRemoveBoard(e, _id as string)}
                  sx={{
                    position: 'absolute',
                    right: '20px',
                    bottom: '20px',
                    cursor: 'pointer',
                  }}
                >
                  <InfoIcon />
                </DeleteOutlinedIcon>
              }
            />
          </ImageListItem>
        ))}
      </>
    );
  };

  return (
    <CustomizedBoardContainer>
      <CustomizedFlex boardHeader>
        <CustomizedH1>BOARDS</CustomizedH1>
        <Button variant="outlined" size="small" onClick={onAddNewBoard}>
          Add
        </Button>
      </CustomizedFlex>
      <ImageList
        variant="masonry"
        sx={{
          columnCount: {
            xs: '1 !important',
            sm: '2 !important',
            md: '3 !important',
            lg: '4 !important',
            xl: '5 !important',
          },
          alignSelf: 'center',
        }}
      >
        {boardsRender()}
      </ImageList>
    </CustomizedBoardContainer>
  );
};

export default BoardsListPage;
