import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import CssBaseline from '@mui/material/CssBaseline';
import * as Constants from './constants';
import Copyright from '../../components/copyright/Copyright';

function Home() {
    return (
        <Container component="main" maxWidth="md" sx={{ display: 'flex', backgroundColor: '#f0f0f0', flexDirection: 'column', minHeight: '100vh', padding: '2rem', textAlign: 'center' }}>
            <CssBaseline />
            <Paper elevation={3} sx={{ flexGrow: 1, padding: '2rem', textAlign: 'center' }}>
                <Typography variant='h2' sx={{ color: '#2c3e50', marginBottom: '1rem', typography: { sm: 'h2', xs: 'h4' } }}>
                    {Constants.WELCOME_HEADER}
                </Typography>
                <Typography variant='h6' sx={{ color: '#7f8c8d', marginBottom: '2rem' }}>
                    {Constants.DESCRIPTION}
                </Typography>
                <Typography variant='h3' sx={{ color: '#2c3e50', marginBottom: '1rem', typography: { sm: 'h3', xs: 'h5' } }}>
                    {Constants.HEADER_BEFORE_INSTRUCTIONS}
                </Typography>
                <Grid container justifyContent="center" spacing={2} sx={{ textAlign: 'left', color: '#34495e', margin: 'auto' }}>
                    {Constants.INSTRUCTIONS.map((instruction, index) => (
                        <Grid item key={index + 1}>
                            {index === 0 ? (
                                <>
                                    {index + 1}. {instruction}&#160;<Link href="/signup" sx={{ color: '#3498db' }}>Sign Up</Link>.
                                </>
                            ) : (
                                `${index + 1}. ${instruction}`
                            )}
                        </Grid>
                    ))}
                </Grid>
                <Typography variant='h6' sx={{ color: '#7f8c8d', marginTop: '2rem' }}>
                    {Constants.LOGINMSG} <Link href="/login" sx={{ color: '#3498db' }}>{Constants.LOGIN}</Link>
                </Typography>
            </Paper>
            <Copyright sx={{ padding: '10px', textAlign: 'center', backgroundColor: '#f1f1f1' }} />
        </Container>
    );
}

export default Home;
