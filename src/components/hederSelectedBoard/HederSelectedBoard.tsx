import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { setModalState } from '../../reduxUsers/actions/modalActions';
import { useAppDispatch } from '../../reduxUsers/hook/reduxCustomHook';

import {
  StyledButtonBack,
  StyledTypographyBoardTitle,
  StyledListSubheader,
} from './styledMuiComponents';
import StyledButtonAddColumn from './ButtonAddColumn';

interface IHederSelectedBoard {
  title: string;
}

const HederSelectedBoard = (props: IHederSelectedBoard) => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onAddNewColumn = () => {
    dispatch(setModalState({ isOpen: true, type: 'ADD_COLUMN' }));
  };

  const onBackToList = () => {
    navigate('/boards');
  };

  const editBoardTitle = () => {
    dispatch(setModalState({ isOpen: true, type: 'EDIT_BOARD' }));
  };

  return (
    <StyledListSubheader>
      <StyledButtonBack func={onBackToList}>{t('BACK')}</StyledButtonBack>
      <StyledButtonAddColumn func={onAddNewColumn} />
      <StyledTypographyBoardTitle func={editBoardTitle}>{props.title}</StyledTypographyBoardTitle>
    </StyledListSubheader>
  );
};

export default HederSelectedBoard;
