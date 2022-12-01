import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { getAllUserBoards, getBoardData } from '../../../reduxUsers/actions/boardActions';
import { getAllBoardColumns, clearColumnData } from '../../../reduxUsers/actions/columnActions';
import { setModalState } from '../../../reduxUsers/actions/modalActions';
import { useAppDispatch } from '../../../reduxUsers/hook/reduxCustomHook';
import { state as boardState } from '../../../reduxUsers/slices/boardSlice';

import StyledMuiListSubheader from '../../../styledComponents/styledMuiComponents/StyledMuiListSubheader';
import MyStyledButton from './StyledButtonBack';
import StyledButtonAddColumn from './StyledButtonAddColumn';
import StyledTypographyBoardTitle from './StyledTypographyBoardTitle';

function HederSelectedBoard() {
  const { id } = useParams();
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { activeBoard } = useSelector(boardState);
  const _id = localStorage.getItem('userId');

  useEffect(() => {
    onLoadBoard();
    return () => onClearState();
  }, []);

  const onLoadBoard = async () => {
    dispatch(setModalState({ isOpen: true, type: 'LOADING' }));
    await dispatch(getAllUserBoards(_id as string, localStorage.getItem('token') as string));
    dispatch(setModalState({ isOpen: true, type: 'LOADING' }));
    await dispatch(getBoardData(id as string, localStorage.getItem('token') as string));
    dispatch(setModalState({ isOpen: true, type: 'LOADING' }));
    await dispatch(getAllBoardColumns(id as string, localStorage.getItem('token') as string));
  };

  const onClearState = () => {
    dispatch(clearColumnData());
  };

  const onAddNewColumn = () => {
    dispatch(setModalState({ isOpen: true, type: 'ADD_COLUMN' }));
  };

  const onEditBoard = async () => {
    dispatch(setModalState({ isOpen: true, type: 'EDIT_BOARD' }));
  };

  const onBackToList = () => {
    navigate('/boards');
  };

  return (
    <StyledMuiListSubheader>
      <MyStyledButton func={onBackToList}>{t('BACK')}</MyStyledButton>
      <StyledButtonAddColumn func={onAddNewColumn} />
      <StyledTypographyBoardTitle func={onEditBoard}>
        {activeBoard.title}
      </StyledTypographyBoardTitle>
    </StyledMuiListSubheader>
  );
}

export default HederSelectedBoard;
