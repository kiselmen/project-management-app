import axios from 'axios';
import { BASE_URL } from '../../consts/consts';
import { ColumnData, ColumnValues } from '../../interfacesAndTypes/interfacesAndTypes';
import { setAllBoardColumns, addColumn, delColumn } from '../slices/columnSlice';
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

// export const deleteBoard = (boardId: string, token: string) => {
//   return async (dispatch: AppDispatch) => {
//     try {
//       const response = await axios.delete<BoardData>(BASE_URL + 'boards/' + boardId, {
//         data: { boardId },
//         headers: {
//           Authorization: 'Bearer ' + token,
//         },
//       });
//       dispatch(delBoard(response.data._id));
//       dispatch(setIsOpen({ isOpen: false, type: 'NONE' }));
//     } catch (e) {
//       dispatch(setErrMessage(JSON.stringify(e)));
//       dispatch(setIsOpen({ isOpen: true, type: 'ERROR' }));
//       console.log('Не удалили досоку ', e);
//     }
//   };
// };

// export const clearBoards = () => {
//   return (dispatch: AppDispatch) => {
//     dispatch(setAllUserBoards([]));
//   };
// };

// export const setActiveUserBoard = (boardId: string) => {
//   return (dispatch: AppDispatch) => {
//     dispatch(setActiveBoard(boardId));
//   };
// };
