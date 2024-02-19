import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, CircularProgress } from '@mui/material';
import { manageUsers } from '../../../../api/admin/adminAPI';
import { employeeListApi } from '../../../../api/user/userAPI';
import type { UserTypeWithoutPassword } from './types';
import * as Constant from "./constants";
import BasePage from '../../../../components/basePage/BasePage';
import { useUpdate } from '../../../../hooks/useUpdate';
import { useAuth } from '../../../../context/AuthContext';
import Loading from '../../../../components/loading/Loading';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

const Edit = () => {
    const navigate = useNavigate();
    const { user, login } = useAuth();
    const update = useUpdate(login);
    const [data, setData] = useState<UserTypeWithoutPassword[]>([]);
    const [loadingRows, setLoadingRows] = useState<string[]>([]);
    const [isLoading, SetIsLoading] = useState(true);

    async function fetch() {
        employeeListApi.getListData()
            .then((response) => {
                setData(response);
            })
            .catch((error: string) => {
                console.error('Error fetching data:', error);
            }).finally(() => SetIsLoading(false));
    }
    useEffect(() => {
        if (user === null) {
            update();
        } else {
            fetch()
        }
    }, [user, update]);

    if (isLoading || user === null) {
        return <Loading />;
    }

    async function handleEdit(id: string) {
        navigate('/admin/editUser', { state: id });
    }

    async function handleDelete(id: string) {
        try {
            setLoadingRows((prevLoadingRows) => [...prevLoadingRows, id]);
            console.log(`Deleting user with id: ${id}`);
            const response = await manageUsers.deleteUser(id);
            console.log(response.data);
        } catch (error) {
            console.error(`Error deleting user: ${error}`);
        } finally {
            fetch();
        }
    }

    return (
        <BasePage admin={user?.admin}>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {Constant.TABLE_HEADERS.map((header: string) => (
                                <TableCell key={header}>{header === 'Actions' ? <span style={{ marginLeft: '40px' }}>{header}</span> : header}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map(item => (
                            <TableRow key={item._id}>
                                {Constant.USER_DATA_KEYS.map((key: string) => (
                                    <TableCell key={key}>
                                        {key === 'admin' ? (item[key as keyof UserTypeWithoutPassword] ? 'Yes' : 'No') :
                                            (item[key as keyof UserTypeWithoutPassword] ? item[key as keyof UserTypeWithoutPassword].toString() : '')}
                                    </TableCell>

                                ))}
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleEdit(item._id)}
                                        disabled={loadingRows.includes(item._id)}
                                        startIcon={<EditIcon />} // Add EditIcon as startIcon
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => handleDelete(item._id)}
                                        disabled={loadingRows.includes(item._id)}
                                        startIcon={<DeleteIcon />} // Add DeleteIcon as startIcon
                                    >
                                        Delete
                                        {loadingRows.includes(item._id) && <CircularProgress size={20} />}
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </BasePage>
    );
}

export default Edit;
