import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  ListSubheader,
  Typography,
} from '@mui/material';

import {
  getAllUserBoards,
  clearBoards,
  updateAddNewBoard,
} from '../reduxUsers/actions/boardActions';

import theme from '../components/themeProvider/theme';

import { CustomizedBoardContainer, StyledMui_ImageListItem_NewBoard } from '../styledComponents';

import { useAppDispatch } from '../reduxUsers/hook/reduxCustomHook';
import { state as boardState } from '../reduxUsers/slices/boardSlice';
import { setModalState } from '../reduxUsers/actions/modalActions';

import BoardBackGround from '../assets/board.jpg';

import BoardInBoards from '../components/boardInBoards/BoardInBoards';
import { useTranslation } from 'react-i18next';
import { AdditionalTools } from './BoardListPage/AdditionalTools';

const BoardsListPage = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const _id = localStorage.getItem('userId');

  const { allBoards, addNewBoard } = useSelector(boardState);

  useEffect(() => {
    onLoadBoards();
    return () => onClearState();
  }, []);

  const onClearState = () => {
    dispatch(clearBoards());
  };

  const onLoadBoards = async () => {
    dispatch(setModalState({ isOpen: true, type: 'LOADING' }));
    await dispatch(getAllUserBoards(_id as string, localStorage.getItem('token') as string));
    if (addNewBoard) {
      dispatch(setModalState({ isOpen: true, type: 'ADD_BOARD' }));
      dispatch(updateAddNewBoard(false));
    }
  };

  const onAddNewBoard = () => {
    dispatch(setModalState({ isOpen: true, type: 'ADD_BOARD' }));
  };

  const boardsRender = () => {
    return (
      <>
        <StyledMui_ImageListItem_NewBoard onClick={onAddNewBoard}>
          <img
            src={`${BoardBackGround}?w=248&fit=crop&auto=format`}
            srcSet={`${BoardBackGround}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt="picture"
            loading="lazy"
          />
          <ImageListItemBar
            sx={{ background: 'none', bottom: '30%' }}
            position="bottom"
            title={
              <Typography variant="h5" fontWeight="bold">
                {t('addNewBoard')}
              </Typography>
            }
          />
        </StyledMui_ImageListItem_NewBoard>
        {allBoards?.map(({ _id, title, subscribe }) => (
          <BoardInBoards key={_id} _id={_id} title={title} subscribe={subscribe} />
        ))}
      </>
    );
  };

  return (
    <>
      <CustomizedBoardContainer>
        <ImageListItem key="Subheader" cols={2}>
          <ListSubheader
            component="div"
            sx={{
              background: `${theme.palette.secondary.main}`,
              textAlign: 'center',
              padding: '0.5rem 0 0.5rem 0',
            }}
          >
            <Typography variant="h4" color="primary" fontWeight={700}>
              {t('BOARDS')}
            </Typography>
          </ListSubheader>
          <AdditionalTools />
        </ImageListItem>
        <ImageList
          variant="quilted"
          gap={10}
          sx={{
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr) !important',
              sm: 'repeat(2, 1fr) !important',
              md: 'repeat(3, 1fr) !important',
              lg: 'repeat(4, 1fr) !important',
            },
            alignSelf: 'center',
            alignContent: 'center',
          }}
        >
          {boardsRender()}
        </ImageList>
      </CustomizedBoardContainer>
    </>
  );
};

export default BoardsListPage;
