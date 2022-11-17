import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteForever';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { setActiveUserBoard } from '../reduxUsers/actions/boardActions';
import { getAllBoardColumns } from '../reduxUsers/actions/columnActions';
import { setModalState } from '../reduxUsers/actions/modalActions';
import { useAppDispatch } from '../reduxUsers/hook/reduxCustomHook';
import { state as columnState } from '../reduxUsers/slices/columnSlice';
import { CustomizedBoardContainer, CustomizedFlex, CustomizedH1 } from '../styledComponents';

function SelectedBordPage() {
  const { id } = useParams();

  const dispatch = useAppDispatch();

  const token = localStorage.getItem('token');
  const _id = localStorage.getItem('userId');
  const { allColumns } = useSelector(columnState);

  useEffect(() => {
    onLoadBoard();
    return () => onClearState();
  }, []);

  const onLoadBoard = async () => {
    setActiveUserBoard(id as string);
    dispatch(setModalState({ isOpen: true, type: 'LOADING' }));
    await dispatch(getAllBoardColumns(_id as string, token as string));
  };

  const onClearState = () => {
    setActiveUserBoard('');
  };

  const onAddNewColumn = () => {
    console.log('Add');
  };

  const columnsRender = () => {
    const items = allColumns?.map(({ _id, title }) => {
      return (
        <Box
          // onClick={() => onOpenBoard(_id as string)}
          sx={{
            bgcolor: 'grey',
            width: '300px',
            hight: '300px',
            minHeight: '300px',
            margin: '15px',
            border: '1px solid black',
            position: 'relative',
          }}
          key={_id}
        >
          {/* <Typography id="transition-modal-title" variant="h6" component="h2">
            {title}
          </Typography> */}
          <Typography id="transition-modal-description" sx={{ mt: 2 }}>
            {title}
          </Typography>
          <DeleteOutlinedIcon
            // onClick={(e) => onRemoveBoard(e, _id as string)}
            sx={{
              position: 'absolute',
              right: '20px',
              bottom: '20px',
              cursor: 'pointer',
            }}
          />
        </Box>
      );
    });
    return items;
  };

  return (
    <CustomizedBoardContainer>
      <CustomizedFlex boardHeader>
        <CustomizedH1>BOARDS</CustomizedH1>
        <Button variant="outlined" size="small" onClick={onAddNewColumn}>
          Add
        </Button>
      </CustomizedFlex>
      <CustomizedFlex boardBody>{columnsRender()}</CustomizedFlex>
    </CustomizedBoardContainer>
  );
}

export default SelectedBordPage;
