// import Typography from '@mui/material/Typography';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteForever';
import { setModalState } from '../../reduxUsers/actions/modalActions';
import { useAppDispatch } from '../../reduxUsers/hook/reduxCustomHook';
import DndColumnsWrapper from '../dnd/dndColumnWrapper';
// import { state as columnState } from '../../../reduxUsers/slices/columnSlice';
import { state as boardState } from '../../reduxUsers/slices/boardSlice';
import { state as taskState } from '../../reduxUsers/slices/taskSlice';
import { useSelector } from 'react-redux';
import { getAllColumnTasks, updateActiveTaskId } from '../../reduxUsers/actions/taskActions';
import DndColumnItems from '../dnd/dndColumnItems';
// import { TaskData } from '../../../interfacesAndTypes/interfacesAndTypes';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useEffect } from 'react';
import { updateActiveColumnId } from '../../reduxUsers/actions/columnActions';

interface ITaskList {
  columnId: string;
}
const TaskList = (props: ITaskList) => {
  const columnId = props.columnId;
  const dispatch = useAppDispatch();

  const token = localStorage.getItem('token');
  const { activeBoardId } = useSelector(boardState);
  const { allTasks } = useSelector(taskState);

  useEffect(() => {
    onLoadTaskList(columnId);
  }, []);

  const onLoadTaskList = async (columnId: string) => {
    dispatch(setModalState({ isOpen: true, type: 'LOADING' }));
    await dispatch(getAllColumnTasks(activeBoardId as string, columnId as string, token as string));
  };

  const onEditTask = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>, taskId: string) => {
    dispatch(updateActiveTaskId(taskId));
    dispatch(updateActiveColumnId(columnId));
    dispatch(setModalState({ isOpen: true, type: 'EDIT_TASK' }));
  };

  const onRemoveTask = async (e: React.MouseEvent<SVGSVGElement>, taskId: string) => {
    e.stopPropagation();
    dispatch(updateActiveColumnId(columnId));
    dispatch(updateActiveTaskId(taskId));
    dispatch(setModalState({ isOpen: true, type: 'DELETE_TASK' }));
  };

  const tasksRender = () => {
    const items = allTasks[columnId]?.map(({ _id, title, order }) => {
      return (
        <DndColumnItems draggableId={_id as string} index={order as number} key={_id as string}>
          <ListItem key={_id}>
            <ListItemText primary={title} onMouseUp={(e) => onEditTask(e, _id as string)} />
            <DeleteOutlinedIcon
              onClick={(e) => onRemoveTask(e, _id as string)}
              sx={{
                position: 'absolute',
                right: '10px',
                bottom: '10px',
                cursor: 'pointer',
              }}
            />
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
