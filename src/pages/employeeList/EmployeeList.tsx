import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, CssBaseline } from '@mui/material';
import Navbar from '../../components/navbar/Navbar';
import employeeListApi from '../../api/user/employeeListApi';
import type { UserData } from "./types";
import * as Constant from "./constant"
import Loading from '../../components/loading/Loading';
function List() {
  const [data, setData] = useState<UserData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    employeeListApi.getListData()
      .then(response => {
        setData(response.data);
        setAdmin(response.admin);
        console.log(response)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      }).finally(() => setIsLoading(false));
  }, []);

  return (
    <Container>
      <CssBaseline />
      <Navbar admin={admin} />
      {isLoading ? (
        <Loading />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {Constant.HEAD_COLUMNS.map((columnName) => (
                  <TableCell key={columnName}>{columnName}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((userData) => (
                <TableRow key={userData._id}>
                  {Constant.USERDATA_FIELDS.map((key) => (
                    <TableCell key={key}>
                      {key === 'admin' ? (userData[key as keyof UserData] ? 'Yes' : 'No') : userData[key as keyof UserData]?.toString()}
                    </TableCell>
                  ))}
                </TableRow>
              ))}

            </TableBody>

          </Table>
        </TableContainer>
      )}
    </Container>
  );
}

export default List;
