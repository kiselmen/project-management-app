import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import React from 'react';

export const SortingBarForm = () => {
  // const onChange = () => {};
  const [sortVal, setsortVal] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setsortVal(event.target.value as string);
  };
  return (
    <>
      <FormControl sx={{ maxWidth: '200px', width: '100%' }}>
        <InputLabel id="sort" sx={{ left: '-7px', top: '-10px' }}>
          Sort
        </InputLabel>
        <Select
          labelId="sort"
          id="sort-select"
          value={sortVal}
          label="Sort"
          onChange={handleChange}
          inputProps={{ sx: { padding: '5px 20px 5px 5px' } }}
        >
          <MenuItem value="">...</MenuItem>
          <MenuItem value="descending">By name (A-Z)</MenuItem>
          <MenuItem value="ascending">By name (Z-A)</MenuItem>
        </Select>
      </FormControl>
    </>
  );
};
