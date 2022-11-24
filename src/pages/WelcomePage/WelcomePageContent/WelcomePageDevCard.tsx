import { Card, CardActionArea, CardMedia, CardContent, Typography, Link } from '@mui/material';
import user from '../../../assets/user.png';

export const WelcomePageDevCard = ({ name, path }: { name: string; path: string }) => {
  return (
    <>
      <Card sx={{ maxWidth: 160 }}>
        <CardActionArea
          sx={{
            position: 'relative',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
          }}
        >
          <CardMedia component="img" height="140" image={user} alt={name} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {name === 'Vasili' ? 'Frontend developer (TeamLeader)' : 'Frontend developer'}
            </Typography>
          </CardContent>
          <Link
            href={path}
            target="_blank"
            sx={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%' }}
          />
        </CardActionArea>
      </Card>
    </>
  );
};
