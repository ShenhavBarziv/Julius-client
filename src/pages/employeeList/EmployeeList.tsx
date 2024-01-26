import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, CssBaseline } from '@mui/material';
import Navbar from '../../components/navbar/Navbar';
import listApi from '../../api/user/listApi';
import type { UserData } from "./types";
import * as Constant from "./constant"
import Loading from '../../components/loading/Loading';
function List() {
  const [data, setData] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    listApi.getListData()
      .then(response => {
        setData(response.data);
        setAdmin(response.admin);
        setLoading(false);
        console.log(response)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  return (
    <Container>
      <CssBaseline />
      <Navbar admin={admin} />
      {loading ? (
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
                    <TableCell key={key}>{userData[key as keyof UserData].toString()}</TableCell>))}
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
