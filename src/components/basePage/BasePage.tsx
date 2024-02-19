import { ReactNode } from 'react';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from '../navbar/Navbar';
import Copyright from '../../components/copyright/Copyright';

interface BasePageProps {
    children: ReactNode;
    admin?: boolean;
}
function BasePage({ children, admin }: BasePageProps) {
    return (
        <Container component="main" maxWidth="lg" sx={{ display: 'flex', backgroundColor: '#f0f0f0', flexDirection: 'column', minHeight: '100vh', padding: '2rem', textAlign: 'center' }}>
            <CssBaseline />
            <Navbar admin={admin} />
            {children}
            <Copyright sx={{ padding: '10px', textAlign: 'center', backgroundColor: '#f1f1f1' }} />
        </Container>
    );
}

export default BasePage;
