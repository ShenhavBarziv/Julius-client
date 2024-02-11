import React, { ReactNode } from 'react';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from '../navbar/Navbar'; // Import your Navbar component
import Copyright from '../../components/copyright/Copyright';

interface BasePageProps {
    children: ReactNode;
    navbar?: boolean; // Updated to boolean for simplicity
}

function BasePage({ children, navbar }: BasePageProps) {
    return (
        <Container component="main" maxWidth="md" sx={{ display: 'flex', backgroundColor: '#f0f0f0', flexDirection: 'column', minHeight: '100vh', padding: '2rem', textAlign: 'center' }}>
            <CssBaseline />
            {navbar && <Navbar />} {/* Render Navbar if the prop is true */}
            {children}
            <Copyright sx={{ padding: '10px', textAlign: 'center', backgroundColor: '#f1f1f1' }} />
        </Container>
    );
}

export default BasePage;
