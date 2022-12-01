import Button from '@mui/material/Button';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface IMyStyledButtonAddColumn {
  children?: React.ReactNode;
  func: () => void;
}

const StyledButtonAddColumnMD = (props: IMyStyledButtonAddColumn) => (
  <Button
    variant="contained"
    sx={{
      display: { xs: 'none', md: 'block' },
      borderRadius: 4,
      flexGrow: '0',
    }}
    onClick={props.func}
  >
    {props.children}
  </Button>
);

const StyledButtonAddColumnSM = (props: IMyStyledButtonAddColumn) => (
  <Button
    variant="contained"
    sx={{
      display: { xs: 'none', sm: 'block', md: 'none' },
      borderRadius: 4,
      flexGrow: '0',
    }}
    onClick={props.func}
  >
    {props.children}
  </Button>
);

const StyledButtonAddColumnXS = (props: IMyStyledButtonAddColumn) => (
  <Button
    variant="contained"
    sx={{
      display: { xs: 'block', sm: 'none' },
      borderRadius: 4,
      flexGrow: '0',
    }}
    onClick={props.func}
  >
    {props.children}
  </Button>
);

const StyledButtonAddColumn = (props: IMyStyledButtonAddColumn) => {
  const { t } = useTranslation();
  return (
    <>
      <StyledButtonAddColumnMD func={props.func}>{t('Add new column')}</StyledButtonAddColumnMD>
      <StyledButtonAddColumnSM func={props.func}>{t('ADD')}</StyledButtonAddColumnSM>
      <StyledButtonAddColumnXS func={props.func}>+</StyledButtonAddColumnXS>
    </>
  );
};

export default StyledButtonAddColumn;
