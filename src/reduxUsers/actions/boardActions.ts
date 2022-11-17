import axios from 'axios';
import { BASE_URL } from '../../consts/consts';
import { BoardData, BoardValues } from '../../interfacesAndTypes/interfacesAndTypes';
import { setAllUserBoards, addBoard, delBoard, setActiveBoard } from '../slices/boardSlice';
import { AppDispatch } from '../store';
import { setErrMessage } from '../slices/errorSlice';
import { setIsOpen } from '../slices/modalSlice';

export const getAllUserBoards = (userId: string, token: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get<BoardValues[]>(BASE_URL + 'boardsSet/' + userId, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      dispatch(setAllUserBoards(response.data));
      dispatch(setIsOpen({ isOpen: false, type: 'NONE' }));
    } catch (e) {
      dispatch(setErrMessage(JSON.stringify(e)));
      dispatch(setIsOpen({ isOpen: true, type: 'ERROR' }));
      console.log('Не дали досок ', e);
    }
  };
};

export const addNewBoard = (board: BoardData, token: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.post<BoardData>(BASE_URL + 'boards', board, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      dispatch(addBoard(response.data));
      dispatch(setIsOpen({ isOpen: false, type: 'NONE' }));
    } catch (e) {
      dispatch(setErrMessage(JSON.stringify(e)));
      dispatch(setIsOpen({ isOpen: true, type: 'ERROR' }));
      console.log('Не добавили досоку ', e);
    }
  };
};

export const deleteBoard = (boardId: string, token: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.delete<BoardData>(BASE_URL + 'boards/' + boardId, {
        data: { boardId },
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      dispatch(delBoard(response.data._id));
      dispatch(setIsOpen({ isOpen: false, type: 'NONE' }));
    } catch (e) {
      dispatch(setErrMessage(JSON.stringify(e)));
      dispatch(setIsOpen({ isOpen: true, type: 'ERROR' }));
      console.log('Не удалили досоку ', e);
    }
  };
};

export const clearBoards = () => {
  return (dispatch: AppDispatch) => {
    dispatch(setAllUserBoards([]));
  };
};

export const setActiveUserBoard = (boardId: string) => {
  return (dispatch: AppDispatch) => {
    dispatch(setActiveBoard(boardId));
  };
};
