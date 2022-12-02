import { BoardData } from '../../../interfacesAndTypes/interfacesAndTypes';
import { setAllUserBoards } from '../../../reduxUsers/slices/boardSlice';
import { AppDispatch } from '../../../reduxUsers/store';

export const sortBoards = (
  sortValue: string,
  dispatch: AppDispatch,
  allBoardsCopy: BoardData[]
) => {
  if (sortValue === 'descending') {
    dispatch(
      setAllUserBoards(
        allBoardsCopy!.sort((a, b) => (a.title!.toLowerCase() < b.title!.toLowerCase() ? -1 : 1))
      )
    );
  } else if (sortValue === 'ascending') {
    dispatch(
      setAllUserBoards(
        allBoardsCopy!.sort((a, b) => (a.title!.toLowerCase() > b.title!.toLowerCase() ? -1 : 1))
      )
    );
  } else if (sortValue! === 'des-subscribe') {
    dispatch(
      setAllUserBoards(
        allBoardsCopy!.sort((a, b) =>
          a.subscribe!.toLowerCase() < b.subscribe!.toLowerCase() ? -1 : 1
        )
      )
    );
  } else if (sortValue! === 'asc-subscribe') {
    dispatch(
      setAllUserBoards(
        allBoardsCopy!.sort((a, b) =>
          a.subscribe!.toLowerCase() > b.subscribe!.toLowerCase() ? -1 : 1
        )
      )
    );
  }
};
