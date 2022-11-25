import React from 'react';
import { useNavigate } from 'react-router-dom';

import { ImageListItemBar } from '@mui/material';

import BoardBackGround from '../../assets/board.jpg';

import theme from '../themeProvider/theme';

import { useAppDispatch } from '../../reduxUsers/hook/reduxCustomHook';
import { updateActiveBoardId } from '../../reduxUsers/actions/boardActions';
import { setModalState } from '../../reduxUsers/actions/modalActions';
import {
  StyledMui_DeleteOutlinedIcon,
  StyledMui_ImageListItem_Board,
} from '../../styledComponents';

interface IBoardInBoards {
  _id?: string;
  title?: string;
  subscribe?: string;
}

const BoardInBoards = (props: IBoardInBoards) => {
  const { _id, title, subscribe } = props;

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const onOpenBoard = (boardId: string) => {
    const point = '/board/' + boardId;
    navigate(point);
  };

  const onEditBoard = async (e: React.MouseEvent<HTMLDivElement>, boardId: string) => {
    e.stopPropagation();
    dispatch(updateActiveBoardId(boardId));
    dispatch(setModalState({ isOpen: true, type: 'EDIT_BOARD' }));
  };

  const onRemoveBoard = async (e: React.MouseEvent<SVGSVGElement>, boardId: string) => {
    e.stopPropagation();
    dispatch(updateActiveBoardId(boardId));
    dispatch(setModalState({ isOpen: true, type: 'DELETE_BOARD' }));
  };

  return (
    <StyledMui_ImageListItem_Board key={_id} onClick={() => onOpenBoard(_id as string)}>
      <img
        src={`${BoardBackGround}?w=248&fit=crop&auto=format`}
        srcSet={`${BoardBackGround}?w=248&fit=crop&auto=format&dpr=2 2x`}
        alt="picture"
        loading="lazy"
      />
      <ImageListItemBar
        position="top"
        title={title}
        subtitle={subscribe}
        onClick={(e) => onEditBoard(e, _id as string)}
      />
      <ImageListItemBar
        position="bottom"
        sx={{ background: 'none' }}
        actionIcon={
          <StyledMui_DeleteOutlinedIcon
            onClick={(e) => onRemoveBoard(e, _id as string)}
            theme={theme}
          />
        }
      />
    </StyledMui_ImageListItem_Board>
  );
};

export default BoardInBoards;
