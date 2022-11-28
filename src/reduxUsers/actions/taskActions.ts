import axios from 'axios';
import { BASE_URL } from '../../consts/consts';
import { TaskData } from '../../interfacesAndTypes/interfacesAndTypes';
import { setAllColumnTasks, setActiveTaskId } from '../slices/taskSlice';
// import { setActiveBoard, setActiveBoardId } from '../slices/boardSlice';
import { AppDispatch } from '../store';
// import { setErrMessage } from '../slices/errorSlice';
import { setIsOpen } from '../slices/modalSlice';
import { checkErrStatus } from './checkErrStatusHelper';
// import { updateErrorState } from './errorActions';

export const getAllColumnTasks = (boardId: string, columnId: string, token: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get<TaskData[]>(
        BASE_URL + 'boards/' + boardId + '/columns/' + columnId + '/tasks',
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );
      const sorted = response.data.sort((a, b) => <number>a.order - <number>b.order);
      dispatch(setAllColumnTasks({ columnId, columnTasks: sorted }));
      dispatch(setIsOpen({ isOpen: false, type: 'NONE' }));
    } catch (e) {
      checkErrStatus(dispatch, <{ response: Response }>e, JSON.stringify(e));
      console.log('Не дали тасков ', e);
    }
  };
};

export const addNewTask = (task: TaskData, boardId: string, columnId: string, token: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      await axios.post<TaskData>(
        BASE_URL + 'boards/' + boardId + '/columns/' + columnId + '/tasks',
        task,
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );
      dispatch(getAllColumnTasks(boardId, columnId, token));
      dispatch(setIsOpen({ isOpen: false, type: 'NONE' }));
    } catch (e) {
      checkErrStatus(dispatch, <{ response: Response }>e, JSON.stringify(e));
      console.log('Не добавили таск ', e);
    }
  };
};

export const editActiveTask = (
  task: TaskData,
  boardId: string,
  columnId: string,
  taskId: string,
  token: string
) => {
  return async (dispatch: AppDispatch) => {
    try {
      await axios.put<TaskData>(
        BASE_URL + 'boards/' + boardId + '/columns/' + columnId + '/tasks/' + taskId,
        task,
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );
      dispatch(getAllColumnTasks(boardId, columnId, token));
    } catch (e) {
      checkErrStatus(dispatch, <{ response: Response }>e, JSON.stringify(e));
      console.log('Не поменяли досоку ', e);
    }
  };
};

export const deleteTask = (boardId: string, columnId: string, taskId: string, token: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      await axios.delete<TaskData>(
        BASE_URL + 'boards/' + boardId + '/columns/' + columnId + '/tasks/' + taskId,
        {
          data: { boardId, columnId },
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );
      dispatch(getAllColumnTasks(boardId, columnId, token));
      dispatch(setIsOpen({ isOpen: false, type: 'NONE' }));
    } catch (e) {
      checkErrStatus(dispatch, <{ response: Response }>e, JSON.stringify(e));
      console.log('Не удалили колонку ', e);
    }
  };
};

export const moveTasksInOneColumn = (
  columnId: string,
  tasks: TaskData[],
  newState: TaskData[],
  token: string
) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(setAllColumnTasks({ columnId, columnTasks: newState }));
      if (tasks.length) {
        await axios.patch<TaskData[]>(BASE_URL + 'tasksSet/', tasks, {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        });
      }
      dispatch(setIsOpen({ isOpen: false, type: 'NONE' }));
    } catch (e) {
      checkErrStatus(dispatch, <{ response: Response }>e, JSON.stringify(e));
      console.log('Не изменили колонки ', e);
    }
  };
};

export const updateActiveTaskId = (taskId: string) => {
  return (dispatch: AppDispatch) => {
    dispatch(setActiveTaskId(taskId));
  };
};
