import axios from 'axios';
import { BASE_URL } from '../../consts/consts';
import { ColumnData, ColumnValues } from '../../interfacesAndTypes/interfacesAndTypes';
import { setAllBoardColumns, addColumn, delColumn, setActiveColumnId } from '../slices/columnSlice';
import { setActiveBoard, setActiveBoardId } from '../slices/boardSlice';
import { AppDispatch } from '../store';
import { setErrMessage } from '../slices/errorSlice';
import { setIsOpen } from '../slices/modalSlice';

export const getAllBoardColumns = (boardId: string, token: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get<ColumnValues[]>(
        BASE_URL + 'boards/' + boardId + '/columns',
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );
      dispatch(setAllBoardColumns(response.data));
      dispatch(setIsOpen({ isOpen: false, type: 'NONE' }));
    } catch (e) {
      dispatch(setErrMessage(JSON.stringify(e)));
      dispatch(setIsOpen({ isOpen: true, type: 'ERROR' }));
      console.log('Не дали досок ', e);
    }
  };
};

export const addNewColumn = (column: ColumnData, boardId: string, token: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.post<ColumnData>(
        BASE_URL + 'boards/' + boardId + '/columns',
        column,
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );
      dispatch(addColumn(response.data));
      dispatch(setIsOpen({ isOpen: false, type: 'NONE' }));
    } catch (e) {
      dispatch(setErrMessage(JSON.stringify(e)));
      dispatch(setIsOpen({ isOpen: true, type: 'ERROR' }));
      console.log('Не добавили досоку ', e);
    }
  };
};

export const editActiveColumn = (
  column: ColumnData,
  boardId: string,
  columnId: string,
  token: string
) => {
  return async (dispatch: AppDispatch) => {
    try {
      await axios.put<ColumnData>(BASE_URL + 'boards/' + boardId + '/columns/' + columnId, column, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      dispatch(getAllBoardColumns(boardId, token));
    } catch (e) {
      dispatch(setErrMessage(JSON.stringify(e)));
      dispatch(setIsOpen({ isOpen: true, type: 'ERROR' }));
      console.log('Не поменяли досоку ', e);
    }
  };
};

export const deleteColumn = (boardId: string, columnId: string, token: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.delete<ColumnData>(
        BASE_URL + 'boards/' + boardId + '/columns/' + columnId,
        {
          data: { boardId, columnId },
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );
      dispatch(delColumn(response.data._id));
      dispatch(setIsOpen({ isOpen: false, type: 'NONE' }));
    } catch (e) {
      dispatch(setErrMessage(JSON.stringify(e)));
      dispatch(setIsOpen({ isOpen: true, type: 'ERROR' }));
      console.log('Не удалили колонку ', e);
    }
  };
};

export const clearColumnData = () => {
  return (dispatch: AppDispatch) => {
    dispatch(setAllBoardColumns([]));
    dispatch(setActiveBoardId(''));
    dispatch(setActiveBoard({}));
  };
};

export const updateActiveColumnId = (columnId: string) => {
  return (dispatch: AppDispatch) => {
    dispatch(setActiveColumnId(columnId));
  };
};
