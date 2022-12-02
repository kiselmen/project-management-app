import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import './SelectedBoardPage.css';

import { getAllUserBoards, getBoardData } from '../../reduxUsers/actions/boardActions';
import {
  getAllBoardColumns,
  moveColumns,
  clearColumnData,
} from '../../reduxUsers/actions/columnActions';
import { setModalState } from '../../reduxUsers/actions/modalActions';
import { useAppDispatch } from '../../reduxUsers/hook/reduxCustomHook';
import { state as columnState } from '../../reduxUsers/slices/columnSlice';
import { state as taskState } from '../../reduxUsers/slices/taskSlice';
import { moveTasksInOneColumn } from '../../reduxUsers/actions/taskActions';

import DndColumnContext from '../../components/dnd/dndColumnContext';
import DndColumnsWrapper from '../../components/dnd/dndColumnWrapper';
import { DropResult } from 'react-beautiful-dnd';

import { ColumnData, TaskData } from '../../interfacesAndTypes/interfacesAndTypes';

import { StyledMuiBoxSelectedBordPageMain } from '../../styledComponents/styledMuiComponents/StyledMuiBox';
import StyledMuiImageListColumns from '../../styledComponents/styledMuiComponents/StyledMuiImageList';
import { HederSelectedBoard, ColumnsRender } from '../../components';

function SelectedBordPage() {
  const { id } = useParams();

  const dispatch = useAppDispatch();

  const { allColumns } = useSelector(columnState);
  const { allTasks } = useSelector(taskState);
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

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    const sourceIndex = source.index;
    const destinationIndex = destination?.index as number;
    if (sourceIndex !== destinationIndex && source.droppableId === 'column') {
      const items = JSON.parse(JSON.stringify(allColumns));
      const [newOrder] = items.splice(sourceIndex - 1, 1);
      items.splice(destinationIndex - 1, 0, newOrder);
      const start = 1;
      const itemsForState = items.map((el: ColumnData, index: number) => {
        return { ...el, order: start + index };
      });
      const itemsForPatch = items.map((el: ColumnData, index: number) => {
        return { _id: el._id, order: start + index };
      });
      dispatch(moveColumns(itemsForPatch, itemsForState, localStorage.getItem('token') as string));
    } else if (source.droppableId !== 'column' && destination) {
      const sourceColumn = source.droppableId;
      const destinationColumn = destination.droppableId;
      if (sourceColumn === destinationColumn) {
        const items = JSON.parse(JSON.stringify(allTasks[sourceColumn]));
        const [newOrder] = items.splice(sourceIndex - 1, 1);
        items.splice(destinationIndex - 1, 0, newOrder);
        const start = 1;
        const itemsForState = items.map((el: TaskData, index: number) => {
          return { ...el, order: start + index };
        });
        const itemsForPatch = items.map((el: TaskData, index: number) => {
          return { _id: el._id, order: start + index, columnId: sourceColumn };
        });
        dispatch(
          moveTasksInOneColumn(
            sourceColumn,
            itemsForPatch,
            itemsForState,
            localStorage.getItem('token') as string
          )
        );
      } else {
        const itemsSource = JSON.parse(JSON.stringify(allTasks[sourceColumn]));
        const itemsDestination = JSON.parse(JSON.stringify(allTasks[destinationColumn]));
        const [newOrder] = itemsSource.splice(sourceIndex - 1, 1);
        itemsDestination.splice(destinationIndex - 1, 0, newOrder);
        const start = 1;
        const itemsForStateSource = itemsSource.map((el: TaskData, index: number) => {
          return { ...el, order: start + index };
        });
        const itemsForPatchSource = itemsSource.map((el: TaskData, index: number) => {
          return { _id: el._id, order: start + index, columnId: sourceColumn };
        });
        const itemsForStateDestination = itemsDestination.map((el: TaskData, index: number) => {
          return { ...el, order: start + index };
        });
        const itemsForPatchDestination = itemsDestination.map((el: TaskData, index: number) => {
          return { _id: el._id, order: start + index, columnId: destinationColumn };
        });
        dispatch(
          moveTasksInOneColumn(
            sourceColumn,
            itemsForPatchSource,
            itemsForStateSource,
            localStorage.getItem('token') as string
          )
        );
        dispatch(
          moveTasksInOneColumn(
            destinationColumn,
            itemsForPatchDestination,
            itemsForStateDestination,
            localStorage.getItem('token') as string
          )
        );
      }
    }
  };

  return (
    <StyledMuiBoxSelectedBordPageMain>
      <HederSelectedBoard />
      <DndColumnContext onDragEnd={onDragEnd}>
        <DndColumnsWrapper droppableId="column" directction="horizontal" type="column">
          <StyledMuiImageListColumns>
            <ColumnsRender />
          </StyledMuiImageListColumns>
        </DndColumnsWrapper>
      </DndColumnContext>
    </StyledMuiBoxSelectedBordPageMain>
  );
}

export default SelectedBordPage;
