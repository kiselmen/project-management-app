import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteForever';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getBoardData } from '../reduxUsers/actions/boardActions';
import {
  getAllBoardColumns,
  // deleteColumn,
  clearColumnData,
  updateActiveColumnId,
  moveColumns,
} from '../reduxUsers/actions/columnActions';
import { setModalState } from '../reduxUsers/actions/modalActions';
import { useAppDispatch } from '../reduxUsers/hook/reduxCustomHook';
import { state as columnState } from '../reduxUsers/slices/columnSlice';
import { state as boardState } from '../reduxUsers/slices/boardSlice';
import { state as taskState } from '../reduxUsers/slices/taskSlice';
import { CustomizedBoardContainer, CustomizedFlex, CustomizedH1 } from '../styledComponents';
import DndColumnContext from '../components/dnd/dndColumnContext';
import DndColumnsWrapper from '../components/dnd/dndColumnWrapper';
import DndColumnItems from '../components/dnd/dndColumnItems';
import { DropResult } from 'react-beautiful-dnd';
import { ColumnData, TaskData } from '../interfacesAndTypes/interfacesAndTypes';
import TaskList from '../components/taskList';
import { moveTasksInOneColumn } from '../reduxUsers/actions/taskActions';
import { ImageList, ImageListItem, ListSubheader } from '@mui/material';
import theme from '../components/themeProvider/theme';

function SelectedBordPage() {
  const { id } = useParams();

  const dispatch = useAppDispatch();

  const token = localStorage.getItem('token');
  const { allColumns } = useSelector(columnState);
  const { activeBoard } = useSelector(boardState);
  const { allTasks } = useSelector(taskState);

  useEffect(() => {
    onLoadBoard();
    return () => onClearState();
  }, []);

  const onLoadBoard = async () => {
    dispatch(setModalState({ isOpen: true, type: 'LOADING' }));
    await dispatch(getBoardData(id as string, token as string));
    dispatch(setModalState({ isOpen: true, type: 'LOADING' }));
    await dispatch(getAllBoardColumns(id as string, token as string));
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

  const onEditBoard = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
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

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    const sourceIndex = source.index;
    const destinationIndex = destination?.index as number;
    if (sourceIndex !== destinationIndex && source.droppableId === 'column') {
      console.log(' Message from Board section ');
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
      // dispatch(setModalState({ isOpen: true, type: 'LOADING' }));
      dispatch(moveColumns(itemsForPatch, itemsForState, token as string));
    } else if (source.droppableId !== 'column' && destination) {
      const sourceColumn = source.droppableId;
      const destinationColumn = destination.droppableId;
      if (sourceColumn === destinationColumn) {
        console.log(sourceColumn, allTasks);
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
        // dispatch(setModalState({ isOpen: true, type: 'LOADING' }));
        dispatch(moveTasksInOneColumn(sourceColumn, itemsForPatch, itemsForState, token as string));
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
        // dispatch(setModalState({ isOpen: true, type: 'LOADING' }));
        dispatch(
          moveTasksInOneColumn(
            sourceColumn,
            itemsForPatchSource,
            itemsForStateSource,
            token as string
          )
        );
        dispatch(
          moveTasksInOneColumn(
            destinationColumn,
            itemsForPatchDestination,
            itemsForStateDestination,
            token as string
          )
        );
      }
    }
  };

  const columnsRender = () => {
    const items = allColumns?.map(({ _id, title, order }) => {
      return (
        <DndColumnItems draggableId={_id as string} index={order as number} key={_id as string}>
          <Box
            sx={{
              bgcolor: 'primary.main',
              width: '280px',
              minHeight: '300px',
              margin: '15px',
              // border: '1px solid black',
              borderRadius: 4,
              position: 'relative',
              // cursor: 'pointer',
            }}
            key={_id}
          >
            <Box
              sx={{
                display: 'flex',
                wrap: 'nowrap',
                justifyContent: 'space-between',
                cursor: 'pointer',
                p: 2,
                // pt: '5px',
              }}
            >
              <Typography
                id="transition-modal-title"
                variant="h5"
                textAlign="center"
                component="h2"
                sx={{
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                }}
                onMouseUp={(e) => onEditColumn(e, _id as string)}
              >
                {title}
              </Typography>
              <DeleteOutlinedIcon onClick={(e) => onRemoveColumn(e, _id as string)} color="error" />
            </Box>
            <TaskList columnId={_id as string}></TaskList>
            <Button
              variant="outlined"
              size="small"
              onClick={() => onAddNewTask(_id as string)}
              sx={{
                position: 'absolute',
                left: '5px',
                bottom: '10px',
                cursor: 'pointer',
              }}
            >
              Add
            </Button>
          </Box>
        </DndColumnItems>
      );
    });
    if (items) {
      return items;
    } else {
      /* TO DO */
      return <div />;
    }
  };

  return (
    <CustomizedBoardContainer>
      <ImageListItem key="Subheader" cols={2}>
        <ListSubheader
          component="div"
          sx={{
            background: `${theme.palette.secondary.main}`,
            textAlign: 'center',
            padding: '0.5rem 0 0.5rem 0',
            cursor: 'pointer',
          }}
          onClick={(e) => onEditBoard(e)}
        >
          <Typography variant="h4" color="primary" fontWeight={700}>
            {activeBoard.title}
          </Typography>
          <Button variant="outlined" size="small" onClick={onAddNewColumn}>
            Add
          </Button>
        </ListSubheader>
      </ImageListItem>
      <DndColumnContext onDragEnd={onDragEnd}>
        <DndColumnsWrapper droppableId="column" directction="horizontal" type="column">
          <ImageList
            // cols={2.5}
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              // overflow: 'hidden',
              flexWrap: 'nowrap',
              transform: 'translateZ(0)',
            }}
          >
            {columnsRender()}
          </ImageList>
          {/* <CustomizedFlex boardBody>{columnsRender()}</CustomizedFlex> */}
        </DndColumnsWrapper>
      </DndColumnContext>
    </CustomizedBoardContainer>
  );
}

export default SelectedBordPage;
