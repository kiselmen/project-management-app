import ListSubheader from '@mui/material/ListSubheader';

interface IStyledListSubheader {
  children: React.ReactNode;
}

const StyledListSubheader = (props: IStyledListSubheader) => (
  <ListSubheader
    component="div"
    sx={{
      textAlign: 'center',
      padding: '0.5rem 0.5rem 0.5rem 0.5rem',
      borderRadius: '0px 0px 16px 16px',
      display: 'flex',
      width: '100%',
      gap: '5px',
      position: 'fixed',
      top: '70px',
    }}
  >
    {props.children}
  </ListSubheader>
);

export default StyledListSubheader;
