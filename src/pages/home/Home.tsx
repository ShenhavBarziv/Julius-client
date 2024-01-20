import Link from '@mui/material/Link';
import './styles.css';
import * as Constants from './constants';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Copyright from '../../components/copyright/Copyright'
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
        <ol>
          <li>{Constants.INSTRUCTION1} <Link href="/SignUp" sx={{ color: '#3498db' }}>{Constants.SIGNUP}</Link>.</li>
          <li>{Constants.INSTRUCTION2}</li>
          <li>{Constants.INSTRUCTION3}</li>
        </ol>
      </Grid>
      <Typography variant='h6' sx={{ color: '#7f8c8d', marginTop: '2rem' }}>
        {Constants.LOGINMSG} <Link href="/login" sx={{ color: '#3498db' }}>{Constants.LOGIN}</Link>
      </Typography>
      <Copyright sx={{ position: 'absolute', bottom: 15, left: 0, right: 0, marginBottom: '10px' }} />
    </Container>
  );
}

export default Home;
