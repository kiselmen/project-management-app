import React, { useEffect } from 'react';
// import Typography from '@mui/material/Typography';
// import DeleteOutlinedIcon from '@mui/icons-material/DeleteForever';
// import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
// import Button from '@mui/material/Button';
// import { DropResult } from 'react-beautiful-dnd';
import { setModalState } from '../../../reduxUsers/actions/modalActions';
import { useAppDispatch } from '../../../reduxUsers/hook/reduxCustomHook';
// import CustomizedFlex from '../../../styledComponents/CustomizedFlex';
// import DndColumnContext from '../../dnd/dndColumnContext/DndColumnContext';
import DndColumnsWrapper from '../../dnd/dndColumnWrapper';
// import { state as columnState } from '../../../reduxUsers/slices/columnSlice';
import { state as boardState } from '../../../reduxUsers/slices/boardSlice';
import { state as taskState } from '../../../reduxUsers/slices/taskSlice';
import { useSelector } from 'react-redux';
import { getAllColumnTasks } from '../../../reduxUsers/actions/taskActions';
import DndColumnItems from '../../dnd/dndColumnItems';
import { ColumnTaskData, TaskData } from '../../../interfacesAndTypes/interfacesAndTypes';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

interface ITaskList {
  columnId: string;
}
const TaskList = (props: ITaskList) => {
  const columnId = props.columnId;

  const dispatch = useAppDispatch();

  const token = localStorage.getItem('token');
  const { activeBoardId } = useSelector(boardState);
  const { allTasks } = useSelector(taskState);

  const allBoardTasks = allTasks ? allTasks[columnId] : ([] as TaskData[]);

  //   if (allTasks) {
  //     const filterded = allTasks[columnId];
  //     allBoardTasks = filterded ? filterded : ([] as TaskData[]);
  //   }

  useEffect(() => {
    onLoadTaskList(columnId);
    // return () => onClearState();
  }, []);

  const onLoadTaskList = async (columnId: string) => {
    console.log(columnId);
    dispatch(setModalState({ isOpen: true, type: 'LOADING' }));
    await dispatch(getAllColumnTasks(activeBoardId as string, columnId as string, token as string));
  };

  const onEditTask = async (e: React.MouseEvent<SVGSVGElement>, columnId: string) => {
    console.log(e, columnId);
  };

  const onRemoveTask = async (e: React.MouseEvent<SVGSVGElement>, columnId: string) => {
    console.log(e, columnId);
  };

  //   const onDragEnd = (result: DropResult) => {
  //     console.log(result);
  //   };

  const tasksRender = () => {
    const items = allBoardTasks?.map(({ _id, title, description, order }) => {
      return (
        <DndColumnItems draggableId={_id as string} index={order as number} key={_id as string}>
          <ListItem key={_id}>
            <ListItemText primary={title} secondary={description ? `${description}` : null} />
            {/* <EditOutlinedIcon
              onClick={(e) => onEditTask(e, _id as string)}
              sx={{
                position: 'absolute',
                right: '10px',
                top: '10px',
                cursor: 'pointer',
              }}
            />
            <DeleteOutlinedIcon
              onClick={(e) => onRemoveTask(e, _id as string)}
              sx={{
                position: 'absolute',
                right: '10px',
                bottom: '10px',
                cursor: 'pointer',
              }}
            /> */}
            {/* <Button
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
            </Button> */}
          </ListItem>
        </DndColumnItems>
      );
    });
    return items;
  };

  return (
    <>
      <DndColumnsWrapper droppableId={columnId} directction="vertical">
        {tasksRender()}
      </DndColumnsWrapper>
    </>
  );
};

export default TaskList;
