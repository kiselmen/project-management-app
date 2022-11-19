/* eslint-disable @typescript-eslint/no-explicit-any */
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteForever';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getBoardData } from '../reduxUsers/actions/boardActions';
import {
  getAllBoardColumns,
  deleteColumn,
  clearColumnData,
  updateActiveColumnId,
} from '../reduxUsers/actions/columnActions';
import { setModalState } from '../reduxUsers/actions/modalActions';
import { useAppDispatch } from '../reduxUsers/hook/reduxCustomHook';
import { state as columnState } from '../reduxUsers/slices/columnSlice';
import { state as boardState } from '../reduxUsers/slices/boardSlice';
import { CustomizedBoardContainer, CustomizedFlex, CustomizedH1 } from '../styledComponents';
import DndColumnContext from '../components/dnd/dndColumnContext';
import DndColumnsWrapper from '../components/dnd/dndColumnWrapper';
import DndColumnItems from '../components/dnd/dndColumnItems';

function SelectedBordPage() {
  const { id } = useParams();

  const dispatch = useAppDispatch();

  const token = localStorage.getItem('token');
  const { allColumns } = useSelector(columnState);
  const { activeBoard } = useSelector(boardState);

  useEffect(() => {
    onLoadBoard();
    return () => onClearState();
  }, []);

  const onLoadBoard = async () => {
    dispatch(setModalState({ isOpen: true, type: 'LOADING' }));
    await dispatch(getBoardData(id as string, token as string));
    dispatch(setModalState({ isOpen: true, type: 'LOADING' }));
    await dispatch(getAllBoardColumns(id as string, token as string));
  };

  const onClearState = () => {
    dispatch(clearColumnData());
  };

  const onAddNewColumn = () => {
    dispatch(setModalState({ isOpen: true, type: 'ADD_COLUMN' }));
  };

  const onRemoveColumn = async (e: React.MouseEvent<SVGSVGElement>, columnId: string) => {
    e.stopPropagation();
    dispatch(setModalState({ isOpen: true, type: 'LOADING' }));
    await dispatch(deleteColumn(id as string, columnId as string, token as string));
  };

  const onEditColumn = async (e: React.MouseEvent<SVGSVGElement>, columnId: string) => {
    e.stopPropagation();
    dispatch(updateActiveColumnId(columnId));
    dispatch(setModalState({ isOpen: true, type: 'EDIT_COLUMN' }));
  };

  const onDragEnd = (result: any) => {
    console.log('Drag End', result);
  };

  const columnsRender = () => {
    const items = allColumns?.map(({ _id, title, order }) => {
      return (
        <DndColumnItems draggableId={_id as string} index={order as number} key={_id as string}>
          <Box
            sx={{
              bgcolor: 'grey',
              width: '300px',
              hight: '300px',
              minHeight: '300px',
              margin: '15px',
              border: '1px solid black',
              position: 'relative',
              cursor: 'pointer',
            }}
            key={_id}
          >
            <Typography id="transition-modal-title" variant="h6" component="h2">
              {title}
            </Typography>
            <EditOutlinedIcon
              onClick={(e) => onEditColumn(e, _id as string)}
              sx={{
                position: 'absolute',
                right: '20px',
                top: '20px',
                cursor: 'pointer',
              }}
            />
            <DeleteOutlinedIcon
              onClick={(e) => onRemoveColumn(e, _id as string)}
              sx={{
                position: 'absolute',
                right: '20px',
                bottom: '20px',
                cursor: 'pointer',
              }}
            />
          </Box>
        </DndColumnItems>
      );
    });
    return items;
  };

  return (
    <CustomizedBoardContainer>
      <CustomizedFlex boardHeader>
        <CustomizedH1>{activeBoard.title}</CustomizedH1>
        <Button variant="outlined" size="small" onClick={onAddNewColumn}>
          Add
        </Button>
      </CustomizedFlex>
      <DndColumnContext onDragEnd={onDragEnd}>
        <DndColumnsWrapper droppableId="columns">
          <CustomizedFlex boardBody>{columnsRender()}</CustomizedFlex>
        </DndColumnsWrapper>
      </DndColumnContext>
    </CustomizedBoardContainer>
  );
}

export default SelectedBordPage;
