import { useEffect, useState } from 'react';
import { manageUsers } from '../../../../../api/admin/adminAPI';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    Container,
    Typography,
    TextField,
    Checkbox,
    Button,
    FormControlLabel,
    Box,
} from '@mui/material';
import Loading from '../../../../../components/loading/Loading';
import { UserTypeWithoutPassword } from '../types';
import BasePage from '../../../../../components/basePage/BasePage';
import { useAuth } from '../../../../../context/AuthContext';
import { useUpdate } from '../../../../../hooks/useUpdate';
import * as Constant from './constants';

function EditUser() {
    const { user, login } = useAuth();
    const update = useUpdate(login);
    const navigate = useNavigate();
    const location = useLocation();
    const userId = location.state;
    const [userData, setUserData] = useState<UserTypeWithoutPassword | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    async function fetchUser() {
        manageUsers.fetchUser(userId)
            .then((response) => {
                setUserData(response);
            })
            .catch((error: string) => {
                console.error('Error fetching data:', error);
            }).finally(() => setIsLoading(false));
    }
    useEffect(() => {
        if (user === null) {
            update();
        } else {
            fetchUser()
        }
    }, [user]);
    if (isLoading || user === null) {
        return <Loading />;
    }

    const handleInputChange = (key: string, value: string | boolean) => {
        setUserData((prevUserData: UserTypeWithoutPassword | null) => ({
            ...prevUserData!,
            [key]: value,
        }));
    };


    const handleSave = async () => {
        try {
            if (userData !== null) {
                const response = await manageUsers.updateUser(userData);
                if (response.status !== 200) {
                    alert(response.data);
                }
            } else {
                throw new Error("userData is null")
            }

        } catch (error) {
            console.error('Error updating user data:', error);
            alert('Error');
        } finally {
            navigate('/admin/');
        }
    };

    return (
        <BasePage>
            <Typography variant="h4" gutterBottom>
                {Constant.HEADER_TEXT}
            </Typography>
            <Box component="form">
                {userData &&
                    Object.entries(userData).map(([key, value]) => (
                        key !== '_id' &&
                        key !== 'password' && (
                            <Container key={key}>
                                <Typography>{key}:</Typography>
                                {key === 'admin' ? (
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={!!value}
                                                onChange={(e) => handleInputChange(key, e.target.checked)}
                                            />
                                        }
                                        label="Admin"
                                    />
                                ) : key === 'birthDate' || key === 'hireDate' ? (
                                    <TextField
                                        type="date"
                                        value={value as string}
                                        onChange={(e) => handleInputChange(key, e.target.value)}
                                        InputLabelProps={{ shrink: true }}
                                    />
                                ) : (
                                    <TextField
                                        type="text"
                                        value={value as string}
                                        onChange={(e) => handleInputChange(key, e.target.value)}
                                    />
                                )}
                            </Container>
                        )
                    ))}
                <Button variant="contained" color="primary" onClick={handleSave}>
                    {Constant.SAVE_BUTTON_TEXT}
                </Button>
            </Box>
        </BasePage>
    );
}

export default EditUser;