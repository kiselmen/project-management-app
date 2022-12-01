import { IconButton, TextField } from '@mui/material';
import { useFormik } from 'formik';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import styled from 'styled-components';
import { FormStyles } from './Form.styles';
import { setSearchValue, state as boardState } from '../../reduxUsers/slices/boardSlice';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../reduxUsers/hook/reduxCustomHook';
import { getAllUserBoards } from '../../reduxUsers/actions/boardActions';
import { setModalState } from '../../reduxUsers/actions/modalActions';
import { setIsOpen } from '../../reduxUsers/slices/modalSlice';
import { useEffect } from 'react';
import { setErrMessage } from '../../reduxUsers/slices/errorSlice';

const SearchBarWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const SearchBarForm = () => {
  const dispatch = useAppDispatch();
  const { allBoards, sortValue } = useSelector(boardState);

  const onSubmit = async (values: { title: string }) => {
    dispatch(setSearchValue(values.title));
    dispatch(setModalState({ isOpen: true, type: 'LOADING' }));
    dispatch(
      getAllUserBoards(
        localStorage.getItem('userId')!,
        localStorage.getItem('token')!,
        values.title,
        sortValue
      )
    );
  };

  const formik = useFormik({
    initialValues: { title: '' },
    onSubmit: onSubmit,
  });

  useEffect(() => {
    if (!allBoards!.length && formik.values.title) {
      dispatch(setErrMessage('Nothing was found according to your request. Try again'));
      dispatch(setIsOpen({ isOpen: true, type: 'ERROR' }));
    }
  }, [allBoards]);

  return (
    <>
      <FormStyles
        onSubmit={formik.handleSubmit}
        onReset={formik.handleReset}
        style={{
          display: 'flex',
          maxWidth: '20rem',
          width: '100%',
        }}
      >
        <SearchBarWrapper>
          <TextField
            type="text"
            name="title"
            placeholder="Search board..."
            style={{ fontFamily: 'inherit', width: '100%' }}
            inputProps={{ sx: { paddingRight: '80px' } }}
            value={formik.values.title ?? ''}
            onChange={formik.handleChange}
          />
          <IconButton
            aria-label="reset"
            type="reset"
            size="small"
            sx={{
              position: 'absolute',
              top: 'calc(50% - 9px)',
              right: '55px',
              padding: '0',
              display: !formik.values.title ? 'none' : 'block',
            }}
          >
            <ClearIcon fontSize="inherit" />
          </IconButton>
          <IconButton
            type="submit"
            aria-label="search"
            size="small"
            sx={{
              fontSize: '1.5rem',
              position: 'absolute',
              width: '50px',
              height: '50px',
              top: 'calc(50% - 25px)',
              right: '3px',
              padding: '0',
            }}
          >
            <SearchIcon fontSize="inherit" />
          </IconButton>
        </SearchBarWrapper>
      </FormStyles>
    </>
  );
};
