import DeleteOutlinedIcon from '@mui/icons-material/DeleteForever';
import { setModalState } from '../../reduxUsers/actions/modalActions';
import { useAppDispatch } from '../../reduxUsers/hook/reduxCustomHook';
import DndColumnsWrapper from '../dnd/dndColumnWrapper';
import { state as boardState } from '../../reduxUsers/slices/boardSlice';
import { state as taskState } from '../../reduxUsers/slices/taskSlice';
import { useSelector } from 'react-redux';
import { getAllColumnTasks, updateActiveTaskId } from '../../reduxUsers/actions/taskActions';
import DndColumnItems from '../dnd/dndColumnItems';
import { useEffect } from 'react';
import { updateActiveColumnId } from '../../reduxUsers/actions/columnActions';
import { Button, Stack, Typography } from '@mui/material';

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

  const onEditTask = async (e: React.MouseEvent, taskId: string) => {
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
          <div key={_id}>
            <Button
              variant="contained"
              sx={{ width: '95%', display: 'flex', justifyContent: 'space-between' }}
              // flexGrow={1}
              // key={_id}
              onMouseUp={(e) => onEditTask(e, _id as string)}
            >
              <Typography variant="body2" textTransform="none" flexGrow={1} textAlign="start">
                {title}
              </Typography>
              <DeleteOutlinedIcon onClick={(e) => onRemoveTask(e, _id as string)} color="error" />
            </Button>
          </div>

          {/* </ListItem> */}
        </DndColumnItems>
      );
    });
    return items;
  };

  return (
    <>
      <DndColumnsWrapper droppableId={columnId} directction="vertical">
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="stretch"
          spacing={1}
          ml={1}
          mr={1}
          maxHeight={150}
          // minHeight={50}
          sx={{ overflowY: 'auto', whiteSpace: 'nowrap', overflowAnchor: 'none' }}
        >
          {tasksRender()}
        </Stack>
      </DndColumnsWrapper>
    </>
  );
};

export default TaskList;
