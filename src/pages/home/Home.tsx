import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import * as Constants from './constant';
import Copyright from '../../components/copyright/Copyright';

function Home() {
  return (
    <Container component="main" maxWidth="md" sx={{ padding: '2rem', textAlign: 'center' }}>
      <CssBaseline />
      <Typography variant='h2' sx={{ color: '#2c3e50', marginBottom: '1rem' }}>
        {Constants.WELCOME_HEADER}
      </Typography>
      <Typography variant='h6' sx={{ color: '#7f8c8d', marginBottom: '2rem' }}>
        {Constants.DESCRIPTION}
      </Typography>
      <Typography variant='h3' sx={{ color: '#2c3e50', marginBottom: '1rem' }}>
        {Constants.HEADER_BEFORE_INSTRUCTIONS}
      </Typography>
      <Grid item xs={6} sx={{ textAlign: 'left', color: '#34495e' }}>
        <List>
          {Constants.INSTRUCTIONS.map((instruction, index) => (
            <ListItem key={index + 1}>
              {index === 0 ? (
                <>
                  {index + 1}. {instruction} &#160; <Link href="/signup">Sign Up</Link>.
                </>
              ) : (
                `${index + 1}. ${instruction}`
              )}
            </ListItem>
          ))}
        </List>
      </Grid>
      <Typography variant='h6' sx={{ color: '#7f8c8d', marginTop: '2rem' }}>
        {Constants.LOGINMSG} <Link href="/login" sx={{ color: '#3498db' }}>{Constants.LOGIN}</Link>
      </Typography>
      <Copyright sx={{ position: 'absolute', bottom: 15, left: 0, right: 0, marginBottom: '10px' }} />
    </Container>
  );
}

export default Home;
