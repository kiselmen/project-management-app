import { CustomizedBoardContainer, CustomizedFlex, CustomizedH1 } from '../styledComponents';
import {
  Box,
  Button,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  ListItemSecondaryAction,
  ListSubheader,
  Typography,
} from '@mui/material';
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
import InfoIcon from '@mui/icons-material/Info';
import BoardBackGround from '../assets/board.jpg';
import theme from '../components/themeProvider/theme';
import { transform } from 'typescript';

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
    const boardBackGroundPicture = () => {
      return (
        <img
          src={`${BoardBackGround}?w=248&fit=crop&auto=format`}
          srcSet={`${BoardBackGround}?w=248&fit=crop&auto=format&dpr=2 2x`}
          alt="picture"
          loading="lazy"
        />
      );
    };

    return (
      <>
        <ImageListItem
          sx={{ width: 250, alignContent: 'center', textAlign: 'center', cursor: 'pointer' }}
          onClick={onAddNewBoard}
        >
          {boardBackGroundPicture()}
          {/* <img
            src={`${BoardBackGround}?w=248&fit=crop&auto=format`}
            srcSet={`${BoardBackGround}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt="picture"
            loading="lazy"
          /> */}
          <ImageListItemBar
            sx={{ background: 'none', bottom: '30%' }}
            position="bottom"
            title={
              <Typography variant="h5" fontWeight="bold">
                Add new board
              </Typography>
            }
          />
        </ImageListItem>
        {allBoards?.map(({ _id, title, subscribe }) => (
          <ImageListItem
            key={_id}
            sx={{ width: 250, height: 150, cursor: 'pointer' }}
            onClick={() => onOpenBoard(_id as string)}
          >
            <img
              src={`${BoardBackGround}?w=248&fit=crop&auto=format`}
              srcSet={`${BoardBackGround}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt="picture"
              loading="lazy"
            />
            <ImageListItemBar position="top" title={title} subtitle={subscribe} />
            <ImageListItemBar
              position="bottom"
              sx={{ background: 'none' }}
              actionIcon={
                <>
                  <EditOutlinedIcon
                    onClick={(e) => onEditBoard(e, _id as string)}
                    sx={{
                      fill: `${theme.palette.secondary.main}`,
                      cursor: 'pointer',
                    }}
                  />
                  <DeleteOutlinedIcon
                    onClick={(e) => onRemoveBoard(e, _id as string)}
                    sx={{
                      fill: `${theme.palette.secondary.main}`,
                      cursor: 'pointer',
                    }}
                  >
                    <InfoIcon />
                  </DeleteOutlinedIcon>
                </>
              }
            />
          </ImageListItem>
        ))}
      </>
    );
  };

  return (
    <CustomizedBoardContainer>
      <ImageListItem key="Subheader" cols={2}>
        <ListSubheader
          component="div"
          sx={{ background: `${theme.palette.secondary.main}`, textAlign: 'center' }}
        >
          <Typography variant="h4" color="primary" fontWeight={700}>
            Boards
          </Typography>
        </ListSubheader>
      </ImageListItem>
      <ImageList
        variant="masonry"
        gap={10}
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
