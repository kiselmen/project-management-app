import React, { useEffect } from 'react';
// import Button from '@mui/material/Button';
import { DropResult } from 'react-beautiful-dnd';
import { setModalState } from '../../../reduxUsers/actions/modalActions';
import { useAppDispatch } from '../../../reduxUsers/hook/reduxCustomHook';
import CustomizedFlex from '../../../styledComponents/CustomizedFlex';
import DndColumnContext from '../../dnd/dndColumnContext/DndColumnContext';
import DndColumnsWrapper from '../../dnd/dndColumnWrapper';
import { state as columnState } from '../../../reduxUsers/slices/columnSlice';
import { state as boardState } from '../../../reduxUsers/slices/boardSlice';
import { useSelector } from 'react-redux';
import { getAllColumnTasks } from '../../../reduxUsers/actions/taskActions';

interface ITaskList {
  columnId: string;
}
const TaskList = (props: ITaskList) => {
  const columnId = props.columnId;

  const dispatch = useAppDispatch();

  const token = localStorage.getItem('token');
  const { activeBoardId } = useSelector(boardState);

  useEffect(() => {
    onLoadTaskList(columnId);
    // return () => onClearState();
  }, []);

  const onLoadTaskList = async (columnId: string) => {
    console.log(columnId);
    dispatch(setModalState({ isOpen: true, type: 'LOADING' }));
    await dispatch(getAllColumnTasks(activeBoardId as string, columnId as string, token as string));
  };

  const onDragEnd = (result: DropResult) => {
    console.log(result);
  };

  const tasksRender = () => {
    return <></>;
  };

  return (
    <>
      <DndColumnContext onDragEnd={onDragEnd}>
        <DndColumnsWrapper droppableId="task">
          <CustomizedFlex boardBody>{tasksRender()}</CustomizedFlex>
        </DndColumnsWrapper>
      </DndColumnContext>
    </>
  );
};

export default TaskList;
