import { IconButton, TextField } from '@mui/material';
import { Formik, Form } from 'formik';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import styled from 'styled-components';

const SearchBarWrapper = styled.label`
  position: relative;
`;

export const SearchBarForm = () => {
  const onSubmit = () => {};
  return (
    <>
      <Formik initialValues={{ text: '' }} onSubmit={onSubmit}>
        <Form>
          <IconButton type="submit" aria-label="search" size="small">
            <SearchIcon fontSize="inherit" />
          </IconButton>
          <SearchBarWrapper>
            <TextField
              type="text"
              name="text"
              placeholder="Search board..."
              style={{ fontFamily: 'inherit' }}
              inputProps={{ sx: { padding: '5px 20px 5px 5px' } }}
            />
            <IconButton
              aria-label="reset"
              size="small"
              sx={{
                position: 'absolute',
                top: '-3px',
                right: '3px',
                padding: '0',
                display: 'none',
              }}
            >
              <ClearIcon fontSize="inherit" />
            </IconButton>
          </SearchBarWrapper>
        </Form>
      </Formik>
    </>
  );
};
