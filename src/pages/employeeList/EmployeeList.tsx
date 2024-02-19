import { useEffect, useState } from 'react'
import BasePage from '../../components/basePage/BasePage';
import { useAuth } from '../../context/AuthContext';
import { UserTypeWithoutPassword } from './types';
import { employeeListApi } from '../../api/user/userAPI';
import Loading from '../../components/loading/Loading';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import * as Constant from './constants'
import { useUpdate } from '../../hooks/useUpdate';

function EmployeeList() {
    const [data, setData] = useState<UserTypeWithoutPassword[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { user, login } = useAuth();
    const update = useUpdate(login);

    useEffect(() => {
        if (user === null) {
            update();
        } else {
            employeeListApi.getListData()
                .then(response => {
                    setData(response);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                }).finally(() => setIsLoading(false));
        }
    }, [user, update]);

    if (user === null) {
        return <Loading />;
    }

    return (
        <BasePage admin={user?.admin}>
            {isLoading ? (
                <Loading />
            ) : (
                <TableContainer component={Paper} sx={{ mt: 4 }}>
                    <Table>
                        <TableHead>
                            <TableRow style={{ backgroundColor: '#d9d9d9' }}> {/* Apply style to the table head */}
                                {Constant.HEAD_COLUMNS.map((columnName) => (
                                    <TableCell key={columnName}>{columnName}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((user) => (
                                <TableRow key={user._id}>
                                    {Constant.USERDATA_FIELDS.map((key) => (
                                        <TableCell key={key}>
                                            {key === 'admin' ? (user[key as keyof UserTypeWithoutPassword] ? 'Yes' : 'No') : user[key as keyof UserTypeWithoutPassword]?.toString()}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </BasePage>
    )
}

export default EmployeeList;
