import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../reduxUsers/hook/reduxCustomHook';
import { setSortValue, state as boardState } from '../../reduxUsers/slices/boardSlice';
import { sortBoards } from './sortBarForm/sortBarFormHelper';

export const SortingBarForm = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { allBoards, sortValue } = useSelector(boardState);
  const allBoardsCopy = [...allBoards!];

  const handleChange = (event: SelectChangeEvent) => {
    dispatch(setSortValue(event.target.value));
    sortBoards(event.target.value, dispatch, allBoardsCopy);
  };

  return (
    <>
      <FormControl sx={{ maxWidth: '200px', width: '100%' }}>
        <InputLabel id="sort">{t('Sort')}</InputLabel>
        <Select
          labelId="sort"
          id="sort-select"
          value={sortValue}
          label={t('Sort')}
          onChange={handleChange}
        >
          <MenuItem value="descending">{t('By name (A-Z)')}</MenuItem>
          <MenuItem value="ascending">{t('By name (Z-A)')}</MenuItem>
          <MenuItem value="des-subscribe">{t('By subscribe (A-Z)')}</MenuItem>
          <MenuItem value="asc-subscribe">{t('By subscribe (Z-A)')}</MenuItem>
        </Select>
      </FormControl>
    </>
  );
};
