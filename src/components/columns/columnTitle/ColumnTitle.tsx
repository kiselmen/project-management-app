import React from 'react';

import DeleteOutlinedIcon from '@mui/icons-material/DeleteForever';

import { updateActiveColumnId } from '../../../reduxUsers/actions/columnActions';
import { setModalState } from '../../../reduxUsers/actions/modalActions';
import { useAppDispatch } from '../../../reduxUsers/hook/reduxCustomHook';

import { StyledButtonColumnTitle, StyledTypographyColumnTitleText } from './styledMuiComponents';

interface IColumnTitle {
  _id: string;
  title: string;
}

const ColumnTitle = (props: IColumnTitle) => {
  const dispatch = useAppDispatch();

  const _id = localStorage.getItem('userId');

  const onRemoveColumn = async (e: React.MouseEvent<SVGSVGElement>, columnId: string) => {
    e.stopPropagation();
    dispatch(updateActiveColumnId(columnId));
    dispatch(setModalState({ isOpen: true, type: 'DELETE_COLUMN' }));
  };

  const onEditColumn = async (
    e: React.MouseEvent<HTMLHeadingElement, MouseEvent>,
    columnId: string
  ) => {
    e.stopPropagation();
    dispatch(updateActiveColumnId(columnId));
    dispatch(setModalState({ isOpen: true, type: 'EDIT_COLUMN' }));
  };

  return (
    <StyledButtonColumnTitle>
      <StyledTypographyColumnTitleText _id={_id as string} func={onEditColumn}>
        {props.title}
      </StyledTypographyColumnTitleText>
      <DeleteOutlinedIcon onClick={(e) => onRemoveColumn(e, _id as string)} color="error" />
    </StyledButtonColumnTitle>
  );
};

export default ColumnTitle;
