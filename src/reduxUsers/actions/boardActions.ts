import axios from 'axios';
import { BASE_URL } from '../../consts/consts';
import { BoardData, BoardValues } from '../../interfacesAndTypes/interfacesAndTypes';
import {
  setAllUserBoards,
  addBoard,
  delBoard,
  setActiveBoard,
  setActiveBoardId,
  setAddNewBoard,
} from '../slices/boardSlice';
import { AppDispatch } from '../store';
import { setErrMessage } from '../slices/errorSlice';
import { setIsOpen } from '../slices/modalSlice';
import { updateErrorState } from './errorActions';
import { logout } from '../slices/authSlice';
import { checkErrStatus } from './checkErrStatusHelper';

export const getAllUserBoards = (userId: string, token: string) => {
  return async (dispatch: AppDispatch) => {
    await axios
      .get<BoardValues[]>(BASE_URL + 'boardsSet/' + userId, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((response) => {
        dispatch(setAllUserBoards(response.data));
        dispatch(setIsOpen({ isOpen: false, type: 'NONE' }));
      })
      .catch((e) => {
        if (e.response !== undefined) {
          if (e.response?.data?.message === 'Invalid token') {
            dispatch(logout());
            dispatch(setErrMessage('Server timed out'));
          } else {
            dispatch(updateErrorState(JSON.stringify(e)));
          }
        } else {
          dispatch(logout());
          dispatch(setErrMessage('Something went wrong'));
        }
        dispatch(setIsOpen({ isOpen: true, type: 'ERROR' }));
      });
  };
};

export const getBoardData = (boardId: string, token: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get<BoardData>(BASE_URL + 'boards/' + boardId, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      dispatch(setActiveBoard(response.data));
      dispatch(setActiveBoardId(boardId));
      dispatch(setIsOpen({ isOpen: false, type: 'NONE' }));
    } catch (e) {
      checkErrStatus(dispatch, <{ response: Response }>e, JSON.stringify(e));
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
      if ((<{ response: Response }>e).response !== undefined) {
        if (!(<{ response: Response }>e).response.ok) {
          dispatch(logout());
          dispatch(setAddNewBoard(false));
          dispatch(setErrMessage('Server timed out'));
        } else {
          dispatch(setErrMessage(JSON.stringify(e)));
        }
      } else {
        dispatch(logout());
        dispatch(setErrMessage('Something went wrong'));
      }
      dispatch(setIsOpen({ isOpen: true, type: 'ERROR' }));
    }
  };
};

export const editActiveBoard = (board: BoardData, boardId: string, token: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.put<BoardData>(BASE_URL + 'boards/' + boardId, board, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      const userId = response.data.owner as string;
      dispatch(getAllUserBoards(userId, token));
    } catch (e) {
      checkErrStatus(dispatch, <{ response: Response }>e, JSON.stringify(e));
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
      checkErrStatus(dispatch, <{ response: Response }>e, JSON.stringify(e));
    }
  };
};

export const clearBoards = () => {
  return (dispatch: AppDispatch) => {
    dispatch(setAllUserBoards([]));
  };
};

export const updateActiveBoardId = (boardId: string) => {
  return (dispatch: AppDispatch) => {
    dispatch(setActiveBoardId(boardId));
  };
};

export const updateAddNewBoard = (type: boolean) => {
  return (dispatch: AppDispatch) => {
    dispatch(setAddNewBoard(type));
  };
};
