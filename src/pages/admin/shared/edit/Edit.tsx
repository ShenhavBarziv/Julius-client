import React, { useEffect, useState } from 'react';
import Navbar from '../../../../components/navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, CircularProgress } from '@mui/material';
import editApi from '../../../../api/admin/editUserApi';
import type { UserData } from './types';
import * as Constant from "./constant";

const Edit = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [cookies, removeCookie] = useCookies(['token']);
  const [admin, setAdmin] = useState(false);

  const [loadingRows, setLoadingRows] = useState<string[]>([]);

  async function fetch() {
    if (!cookies || !cookies.token) {
      navigate('/login');
    }

    try {
      const response = await editApi.fetchData();
      console.log(response);

      if (response.data.status) {
        if (response.data.admin) {
          setAdmin(true);
          setData(response.data.data);
        } else {
          alert('Access denied');
          navigate('/profile');
        }
        setLoading(false);
      } else {
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        navigate('/login');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetch();
  }, []);

  async function handleEdit(id: string) {
    navigate('/admin/editUser', { state: id });
  }

  async function handleDelete(id: string) {
    try {
      setLoadingRows((prevLoadingRows) => [...prevLoadingRows, id]);
      console.log(`Deleting user with id: ${id}`);
      const response = await editApi.deleteUser(id);
      console.log(response.data);
    } catch (error) {
      console.error(`Error deleting user: ${error}`);
    } finally {
      fetch();
      //setLoadingRows((prevLoadingRows) => prevLoadingRows.filter((rowId) => rowId !== id));
    }
  }

  return (
    <>
      <Navbar admin={admin} />
      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table className="user-table">
            <TableHead>
              <TableRow>
                {Constant.TABLE_HEADERS.map(header => (
                  <TableCell key={header}>{header === 'Actions' ? <span style={{ marginLeft: '40px' }}>{header}</span> : header}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map(item => (
                <TableRow key={item._id}>
                  {Constant.USER_DATA_KEYS.map(key => (
                    <TableCell key={key}>
                      {item[key as keyof UserData] ? item[key as keyof UserData].toString() : ''}
                    </TableCell>
                  ))}
                  <TableCell>
                    <Button variant="contained" color="primary" onClick={() => handleEdit(item._id)} disabled={loadingRows.includes(item._id)}>
                      Edit
                    </Button>
                    <Button variant="contained" color="secondary" onClick={() => handleDelete(item._id)} disabled={loadingRows.includes(item._id)}>
                      Delete
                      {loadingRows.includes(item._id) && <CircularProgress size={20} />}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}

export default Edit;
