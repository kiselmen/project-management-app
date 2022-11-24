import { Paper, styled as MuiStyled, Typography } from '@mui/material';

const Item = MuiStyled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  width: '157px',
}));

export const WelcomePageCard = ({ img, text }: { img: string; text: string }) => {
  return (
    <>
      <Item>
        <img src={img} alt={text} style={{ width: '100%' }} />
        <Typography variant="h6" component="h6">
          {text}
        </Typography>
      </Item>
    </>
  );
};
