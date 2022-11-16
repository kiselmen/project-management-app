import axios from 'axios';
import { BoardData, BoardValues } from '../../interfacesAndTypes/interfacesAndTypes';
import { setAllUserBoards, addBoard } from '../slices/boardSlice';
import { AppDispatch } from '../store';

export const getAllUserBoards = (userId: string, token: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get<BoardValues[]>(
        'https://final-task-backend-production-08b7.up.railway.app/boardsSet/' + userId,
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );
      dispatch(setAllUserBoards(response.data));
      // alert('доски забрал');
    } catch (e) {
      alert('Не дали досок');
    }
  };
};

export const addNewBoard = (board: BoardData, token: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.post<BoardValues>(
        'https://final-task-backend-production-08b7.up.railway.app/boards',
        board,
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );
      dispatch(addBoard(response.data));
    } catch (e) {
      alert('Не добавили досоку');
    }
  };
};
