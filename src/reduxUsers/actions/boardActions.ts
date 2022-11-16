import axios from 'axios';
import { BASE_URL } from '../../consts/consts';
import { BoardData, BoardValues } from '../../interfacesAndTypes/interfacesAndTypes';
import { setAllUserBoards, addBoard } from '../slices/boardSlice';
import { AppDispatch } from '../store';
import { setErrMessage } from '../slices/errorSlice';
import { setIsOpen } from '../slices/modalSlice';
// import { useAppDispatch } from '../../reduxUsers/hook/reduxCustomHook';
// import { updateErrorState } from '../../reduxUsers/actions/errorActions';

export const getAllUserBoards = (userId: string, token: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get<BoardValues[]>(BASE_URL + 'boardsSet/' + userId, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      dispatch(setAllUserBoards(response.data));
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
      const response = await axios.post<BoardValues>(BASE_URL + 'boards', board, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      dispatch(addBoard(response.data));
    } catch (e) {
      dispatch(setErrMessage(JSON.stringify(e)));
      dispatch(setIsOpen({ isOpen: true, type: 'ERROR' }));
      console.log('Не добавили досоку ', e);
    }
  };
};
