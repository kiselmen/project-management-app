import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Box } from '@mui/material';

import { getAllUserBoards, getBoardData } from '../../reduxUsers/actions/boardActions';
import { getAllBoardColumns, clearColumnData } from '../../reduxUsers/actions/columnActions';
import { setModalState } from '../../reduxUsers/actions/modalActions';
import { useAppDispatch } from '../../reduxUsers/hook/reduxCustomHook';
import { state as columnState } from '../../reduxUsers/slices/columnSlice';

import DndColumnItems from '../dnd/dndColumnItems';

import TaskList from '../taskList';
import StyledBoxColumn from './StyledBoxColumn';
import ButtonAddTask from './buttonAddTask/ButtonAddTask';
import ColumnTitle from './columnTitle/ColumnTitle';

function ColumnsRender() {
  const { id } = useParams();

  const dispatch = useAppDispatch();

  const { allColumns } = useSelector(columnState);
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

  const items = allColumns?.map(({ _id, title, order }) => {
    return (
      <Box key={_id}>
        <DndColumnItems draggableId={_id as string} index={order as number} key={_id as string}>
          <StyledBoxColumn>
            <ColumnTitle _id={_id as string} title={title as string} />
            <TaskList columnId={_id as string} />
            <ButtonAddTask _id={_id as string} />
          </StyledBoxColumn>
        </DndColumnItems>
      </Box>
    );
  });

  return <>{items}</>;
}

export default ColumnsRender;
