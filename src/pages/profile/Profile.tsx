import { useEffect } from 'react';
import BasePage from '../../components/basePage/BasePage';
import { useAuth } from '../../context/AuthContext';
import { Paper, Typography } from '@mui/material';
import * as Constant from './constants'
import Loading from '../../components/loading/Loading'
import { useUpdate } from '../../hooks/useUpdate';
function Profile() {
    const { user, login } = useAuth();
    const update = useUpdate(login);
    useEffect(() => {
        if (user === null) {
            update()
        }
    }, [user]);
    if (user === null) {
        return <Loading />;
    }
    return (
        <BasePage admin={user?.admin}>
            <Paper elevation={3} sx={{ mt: 2 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    {Constant.Header}
                </Typography>
                {Object.entries(user).map(([key, value]) => (
                    key !== '_id' && (
                        <Typography key={key} variant="h5" component="h1" gutterBottom>
                            <strong>{key}:</strong> {String(value)}
                        </Typography>
                    )
                ))}
                <br />
            </Paper>
        </BasePage >
    )
}

export default Profile;
