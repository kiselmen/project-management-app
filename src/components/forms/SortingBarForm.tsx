import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../reduxUsers/hook/reduxCustomHook';
import {
  setAllUserBoards,
  setSortValue,
  state as boardState,
} from '../../reduxUsers/slices/boardSlice';

export const SortingBarForm = () => {
  const dispatch = useAppDispatch();
  const { allBoards, sortValue } = useSelector(boardState);
  const allBoardsCopy = [...allBoards!];

  const handleChange = (event: SelectChangeEvent) => {
    dispatch(setSortValue(event.target.value));

    if (event.target.value === 'descending') {
      dispatch(
        setAllUserBoards(
          allBoardsCopy!.sort((a, b) => (a.title!.toLowerCase() < b.title!.toLowerCase() ? -1 : 1))
        )
      );
    } else if (event.target.value === 'ascending') {
      dispatch(
        setAllUserBoards(
          allBoardsCopy!.sort((a, b) => (a.title!.toLowerCase() > b.title!.toLowerCase() ? -1 : 1))
        )
      );
    }
  };

  return (
    <>
      <FormControl sx={{ maxWidth: '200px', width: '100%' }}>
        <InputLabel id="sort">Sort</InputLabel>
        <Select
          labelId="sort"
          id="sort-select"
          value={sortValue}
          label="Sort"
          onChange={handleChange}
        >
          <MenuItem value="descending">By name (A-Z)</MenuItem>
          <MenuItem value="ascending">By name (Z-A)</MenuItem>
        </Select>
      </FormControl>
    </>
  );
};
