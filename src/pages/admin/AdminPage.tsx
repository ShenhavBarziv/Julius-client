import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Box, Link as MuiLink, Button, Stack } from '@mui/material'; // Import Stack component
import Loading from '../../components/loading/Loading';
import BasePage from '../../components/basePage/BasePage';
import { useAuth } from '../../context/AuthContext';
import { useUpdate } from '../../hooks/useUpdate';
import * as Constant from './constants';
import EditIcon from '@mui/icons-material/Edit';
import ApproveIcon from '@mui/icons-material/ThumbUp';

const Admin = () => {
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
            {user.admin && (
                <Box textAlign="center" p={4}>
                    <Typography variant="h4" gutterBottom sx={{ mt: 4, mb: 4 }}>
                        {Constant.ADMIN_WELCOME_TEXT}
                    </Typography>
                    <Stack
                        direction={{ xs: 'column', md: 'row' }}
                        spacing={3}
                        sx={{ justifyContent: 'center' }}
                    >
                        <MuiLink component={Link} to="/admin/edit">
                            <Button
                                variant="contained"
                                color="primary"
                                size="medium"
                                startIcon={<EditIcon />}
                            >
                                {Constant.EDIT_USER_TEXT}
                            </Button>
                        </MuiLink>
                        <MuiLink component={Link} to="/admin/approve">
                            <Button
                                variant="contained"
                                color="secondary"
                                size="medium"
                                startIcon={<ApproveIcon />}
                            >
                                {Constant.APPROVE_USERS_TEXT}
                            </Button>
                        </MuiLink>
                    </Stack>
                </Box>
            )}
        </BasePage>
    );
};

export default Admin;
