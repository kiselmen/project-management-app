import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { DeleteOutlined, Check, Clear } from '@mui/icons-material';

import { editActiveColumn, updateActiveColumnId } from '../../../reduxUsers/actions/columnActions';
import { setModalState } from '../../../reduxUsers/actions/modalActions';
import { useAppDispatch } from '../../../reduxUsers/hook/reduxCustomHook';
import { state as boardState } from '../../../reduxUsers/slices/boardSlice';
import { state as columnState } from '../../../reduxUsers/slices/columnSlice';

import {
  StyledBoxColumnInput,
  StyledButtonColumnTitle,
  StyledTypographyColumnTitleText,
} from './styledMuiComponents';

import { CustomizedButton, CustomizedInput } from '../../../styledComponents';

interface IColumnTitle {
  _id: string;
  title: string;
}

const ColumnTitle = (props: IColumnTitle) => {
  const dispatch = useAppDispatch();

  const { _id, title } = props;

  const { activeBoardId } = useSelector(boardState);
  const { allColumns } = useSelector(columnState);

  const [columnTitle, setColumnTitle] = useState(title);
  const [isEditNow, setIsEditNow] = useState(false);

  useEffect(() => {
    setColumnTitle(title);
  }, []);

  const onRemoveColumn = async (e: React.MouseEvent<SVGSVGElement>, columnId: string) => {
    e.stopPropagation();
    dispatch(updateActiveColumnId(columnId));
    dispatch(setModalState({ isOpen: true, type: 'DELETE_COLUMN' }));
  };

  const updateColumnTitle = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    columnId: string
  ) => {
    e.stopPropagation();
    const activeColumnData = allColumns ? allColumns.filter((item) => item._id === _id)[0] : {};
    await dispatch(
      editActiveColumn(
        { title: columnTitle, order: activeColumnData.order },
        activeBoardId as string,
        columnId as string,
        localStorage.getItem('token') as string,
        ''
      )
    );

    setIsEditNow((state) => !state);
  };

  const toggleIsEditNow = async () => {
    setIsEditNow((state) => !state);
  };

  const cancelEdit = () => {
    setColumnTitle(title);
    toggleIsEditNow();
  };

  const editColumnTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColumnTitle(e.target.value);
  };

  const titleElement = () => {
    return !isEditNow ? (
      <>
        <StyledTypographyColumnTitleText _id={_id as string} func={toggleIsEditNow}>
          {columnTitle}
        </StyledTypographyColumnTitleText>
        <DeleteOutlined onClick={(e) => onRemoveColumn(e, _id as string)} color="error" />
      </>
    ) : (
      <StyledBoxColumnInput>
        <CustomizedInput onChange={editColumnTitle} value={columnTitle}></CustomizedInput>
        <CustomizedButton onClick={(e) => updateColumnTitle(e, _id)}>
          <Check />
        </CustomizedButton>
        <CustomizedButton onClick={cancelEdit}>
          <Clear />
        </CustomizedButton>
      </StyledBoxColumnInput>
    );
  };

  return <StyledButtonColumnTitle>{titleElement()}</StyledButtonColumnTitle>;
};

export default ColumnTitle;
