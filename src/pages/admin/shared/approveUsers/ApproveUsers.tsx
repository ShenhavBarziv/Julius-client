import { useEffect, useState } from 'react';
import {
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
} from '@mui/material';
import { approveApi } from '../../../../api/admin/adminAPI';
import type { UserData } from './types';
import * as Constants from './constants';
import BasePage from '../../../../components/basePage/BasePage';
import { useUpdate } from '../../../../hooks/useUpdate';
import { useAuth } from '../../../../context/AuthContext';
import Loading from '../../../../components/loading/Loading';
import GroupIcon from '@mui/icons-material/Group';
import DeleteIcon from '@mui/icons-material/Delete';

function ApproveUsers() {
    const [data, setData] = useState<UserData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [loadingRows, setLoadingRows] = useState<string[]>([]);
    const { user, login } = useAuth();
    const update = useUpdate(login);
    const fetchData = async () => {
        try {
            const newData = await approveApi.list();
            setData(newData);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        if (user === null) {
            update()
        }
        else if (user.admin) {
            setIsLoading(true);
            fetchData().then(() => setIsLoading(false))
        }

    }, [user]);
    if (isLoading || user === null) {
        return <Loading />;
    }

    const handleApprove = async (id: string) => {
        try {
            setLoadingRows((prevLoadingRows) => [...prevLoadingRows, id]);
            const result = await approveApi.approveUser(id);
            if (result.status === 500) {
                alert("Error");
            } else if (result.status === 404) {
                alert("User Not found")
            }
        } finally {
            setLoadingRows((prevLoadingRows) => prevLoadingRows.filter((rowId) => rowId !== id));
            await fetchData();
        }
    };

    const handleDelete = async (id: string) => {
        try {
            setLoadingRows((prevLoadingRows) => [...prevLoadingRows, id]);
            const result = await approveApi.deleteUser(id);
            if (result.status === 500) {
                alert("Error");
            } else if (result.status === 404) {
                alert("User Not found")
            }
        } finally {
            setLoadingRows((prevLoadingRows) => prevLoadingRows.filter((rowId) => rowId !== id));
            await fetchData();
        }
    };

    return (
        <BasePage admin={user?.admin}>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {Constants.TABLE_HEADERS.map((header: string) => (
                                <TableCell key={header}>{header === 'Actions' ? <span style={{ marginLeft: '40px' }}>{header}</span> : header}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((item) => (
                            <TableRow key={item._id}>
                                {Constants.USER_DATA_KEYS.map((key: string) => (
                                    <TableCell key={key}>{item[key as keyof UserData].toString()}</TableCell>
                                ))}
                                <TableCell>
                                    <Button
                                        variant='contained'
                                        color='primary'
                                        onClick={() => handleApprove(item._id)}
                                        disabled={loadingRows.includes(item._id)}
                                        startIcon={<GroupIcon />}
                                    >
                                        {Constants.BUTTON_NAMES.APPROVE}
                                        {loadingRows.includes(item._id) && <CircularProgress size={20} />}
                                    </Button>
                                    <Button
                                        variant='contained'
                                        color='secondary'
                                        onClick={() => handleDelete(item._id)}
                                        disabled={loadingRows.includes(item._id)}
                                        startIcon={<DeleteIcon />}
                                    >
                                        {Constants.BUTTON_NAMES.DELETE}
                                        {loadingRows.includes(item._id) && <CircularProgress size={20} />}
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </BasePage>
    )
}

export default ApproveUsers;
