import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import './SelectedBoardPage.css';

import { Box, Button } from '@mui/material';
import Typography from '@mui/material/Typography';

import DeleteOutlinedIcon from '@mui/icons-material/DeleteForever';

import { getAllUserBoards, getBoardData } from '../../reduxUsers/actions/boardActions';
import {
  getAllBoardColumns,
  updateActiveColumnId,
  moveColumns,
  clearColumnData,
} from '../../reduxUsers/actions/columnActions';
import { setModalState } from '../../reduxUsers/actions/modalActions';
import { useAppDispatch } from '../../reduxUsers/hook/reduxCustomHook';
import { state as columnState } from '../../reduxUsers/slices/columnSlice';
import { state as boardState } from '../../reduxUsers/slices/boardSlice';
import { state as taskState } from '../../reduxUsers/slices/taskSlice';
import { moveTasksInOneColumn } from '../../reduxUsers/actions/taskActions';

import DndColumnContext from '../../components/dnd/dndColumnContext';
import DndColumnsWrapper from '../../components/dnd/dndColumnWrapper';
import DndColumnItems from '../../components/dnd/dndColumnItems';
import { DropResult } from 'react-beautiful-dnd';

import { ColumnData, TaskData } from '../../interfacesAndTypes/interfacesAndTypes';

import TaskList from '../../components/taskList';
import { StyledMuiBoxSelectedBordPageMain } from '../../styledComponents/styledMuiComponents/StyledMuiBox';
import StyledMuiListSubheader from '../../styledComponents/styledMuiComponents/StyledMuiListSubheader';
import MyStyledButton from './HederSelectedBoard/StyledButtonBack';
import StyledButtonAddColumn from './HederSelectedBoard/StyledButtonAddColumn';
import StyledTypographyBoardTitle from './HederSelectedBoard/StyledTypographyBoardTitle';
import StyledMuiImageListColumns from '../../styledComponents/styledMuiComponents/StyledMuiImageList';
import HederSelectedBoard from './HederSelectedBoard/HederSelectedBoard';

function SelectedBordPage() {
  const { id } = useParams();
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { allColumns } = useSelector(columnState);
  const { activeBoard } = useSelector(boardState);
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

  const onAddNewColumn = () => {
    dispatch(setModalState({ isOpen: true, type: 'ADD_COLUMN' }));
  };

  const onAddNewTask = (columnId: string) => {
    console.log('Add new task ', columnId);
    dispatch(updateActiveColumnId(columnId));
    dispatch(setModalState({ isOpen: true, type: 'ADD_TASK' }));
  };

  const onEditBoard = async () => {
    dispatch(setModalState({ isOpen: true, type: 'EDIT_BOARD' }));
  };

  const onRemoveColumn = async (e: React.MouseEvent<SVGSVGElement>, columnId: string) => {
    e.stopPropagation();
    dispatch(updateActiveColumnId(columnId));
    dispatch(setModalState({ isOpen: true, type: 'DELETE_COLUMN' }));
  };

  const onEditColumn = async (
    e: React.MouseEvent<HTMLHeadingElement, MouseEvent>,
    columnId: string
  ) => {
    e.stopPropagation();
    dispatch(updateActiveColumnId(columnId));
    dispatch(setModalState({ isOpen: true, type: 'EDIT_COLUMN' }));
  };

  const onBackToList = () => {
    navigate('/boards');
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

  const columnsRender = () => {
    const items = allColumns?.map(({ _id, title, order }) => {
      return (
        <Box key={_id}>
          <DndColumnItems draggableId={_id as string} index={order as number} key={_id as string}>
            <Box
              sx={{
                bgcolor: 'primary.main',
                width: '280px',
                maxHeight: 'calc(100vh - 320px)',
                margin: '15px',
                borderRadius: '16px',
                position: 'relative',
              }}
              // key={_id}
            >
              <Button
                component="div"
                variant="contained"
                sx={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  mb: 1,
                  borderRadius: 4,
                  textTransform: 'none',
                }}
              >
                <Typography
                  id="transition-modal-title"
                  variant="h5"
                  textAlign="center"
                  component="h2"
                  flexGrow={1}
                  sx={{
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    lineHeight: '1',
                  }}
                  onMouseUp={(e) => onEditColumn(e, _id as string)}
                >
                  {title}
                </Typography>
                <DeleteOutlinedIcon
                  onClick={(e) => onRemoveColumn(e, _id as string)}
                  color="error"
                />
              </Button>
              <TaskList columnId={_id as string}></TaskList>
              <Button
                component="div"
                variant="contained"
                sx={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  mt: 1,
                  // mb: 1,
                  borderRadius: 4,
                  textTransform: 'none',
                }}
                onMouseUp={() => onAddNewTask(_id as string)}
              >
                {t('Add task')}
              </Button>
            </Box>
          </DndColumnItems>
        </Box>
      );
    });
    return <>{items}</>;
  };

  return (
    <StyledMuiBoxSelectedBordPageMain>
      <HederSelectedBoard />
      {/* <StyledMuiListSubheader>
        <MyStyledButton func={onBackToList}>{t('BACK')}</MyStyledButton>
        <StyledButtonAddColumn func={onAddNewColumn} />
        <StyledTypographyBoardTitle func={onEditBoard}>
          {activeBoard.title}
        </StyledTypographyBoardTitle>
      </StyledMuiListSubheader> */}
      <DndColumnContext onDragEnd={onDragEnd}>
        <DndColumnsWrapper droppableId="column" directction="horizontal" type="column">
          <StyledMuiImageListColumns>{columnsRender()}</StyledMuiImageListColumns>
        </DndColumnsWrapper>
      </DndColumnContext>
    </StyledMuiBoxSelectedBordPageMain>
  );
}

export default SelectedBordPage;
