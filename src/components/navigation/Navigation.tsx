import * as React from 'react';
import Box from '@mui/material/Box';
import QueueSharpIcon from '@mui/icons-material/QueueSharp';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import ManageAccountsSharpIcon from '@mui/icons-material/ManageAccountsSharp';
import { Link } from 'react-router-dom';
import { CustomizedFlex } from '../../styledComponents';

const pages = ['BOARDS', 'NEW BOARD', 'PROFILE'];

const preventDefault = (event: React.SyntheticEvent) => event.preventDefault();

function Navigation() {
  return (
    <Box
      sx={{
        flexGrow: 2,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        typography: 'body1',
        '& > :not(style) + :not(style)': {
          ml: 2,
        },
      }}
      onClick={preventDefault}
    >
      <Link to="/boards">
        <CustomizedFlex>
          <ListAltOutlinedIcon />
          {pages[0]}
        </CustomizedFlex>
      </Link>
      <Link to="/board">
        <CustomizedFlex>
          <QueueSharpIcon />
          {pages[1]}
        </CustomizedFlex>
      </Link>
      <Link to="/profile">
        <CustomizedFlex>
          <ManageAccountsSharpIcon />

          {pages[2]}
        </CustomizedFlex>
      </Link>
    </Box>
  );
}

export default Navigation;
