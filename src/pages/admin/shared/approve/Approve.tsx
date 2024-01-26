import React, { useEffect, useState } from 'react';
import Navbar from '../../../../components/navbar/Navbar';
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
import approveApi from '../../../../api/admin/approveApi';
import type { UserData } from './types';
import * as Constants from './constant';
import { useNavigate } from 'react-router-dom';

function Approve() {
  const [data, setData] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<string | null>(null);
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(false);

  const [loadingRows, setLoadingRows] = useState<string[]>([]);

  const fetchData = async () => {
    try {
      const result = await approveApi.fetchData();
      console.log(result);
      if (result.success) {
        setData(result.data);
        setAdmin(true);
      } else if (result.message === 'notAdmin') {
        alert(Constants.MESSAGES.ACCESS_DENIED_ADMIN);
        navigate('/profile');
      } else if (result.message === 'notLoggedIn') {
        alert(Constants.MESSAGES.ACCESS_DENIED_LOGIN);
        navigate('/login');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Error');
      navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [navigate]);

  const handleApprove = async (id: string) => {
    try {
      setLoadingRows((prevLoadingRows) => [...prevLoadingRows, id]);
      const result = await approveApi.approveUser(id);
      if (!result.success) {
        alert(result.message);
      }
    } finally {
      fetchData();
      //setLoadingRows((prevLoadingRows) => prevLoadingRows.filter((rowId) => rowId !== id));//this line stop the rows from loading but this is useless because the rows disappeared after an action
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setLoadingRows((prevLoadingRows) => [...prevLoadingRows, id]);
      const result = await approveApi.deleteUser(id);
      if (!result.success) {
        alert(result.message);
      }
    } finally {
      fetchData();
      //setLoadingRows((prevLoadingRows) => prevLoadingRows.filter((rowId) => rowId !== id));
    }
  };

  return (
    <>
      <Navbar admin={admin} />
      {loading ? (
        <p className='loading'>{Constants.MESSAGES.LOADING}</p>
      ) : status === 'notAdmin' ? (
        <p className='error-message'>{Constants.MESSAGES.ACCESS_DENIED_ADMIN}</p>
      ) : status === 'notLoggedIn' ? (
        <p className='error-message'>{Constants.MESSAGES.ACCESS_DENIED_LOGIN}</p>
      ) : (
        <TableContainer component={Paper}>
          <Table className='user-table'>
            <TableHead>
              <TableRow>
                {Constants.TABLE_HEADERS.map((header) => (
                  <TableCell key={header}>{header === 'Actions' ? <span style={{ marginLeft: '40px' }}>{header}</span> : header}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item._id}>
                  {Constants.USER_DATA_KEYS.map((key) => (
                    <TableCell key={key}>{item[key as keyof UserData].toString()}</TableCell>
                  ))}
                  <TableCell>
                    <Button
                      variant='contained'
                      color='primary'
                      onClick={() => handleApprove(item._id)}
                      disabled={loadingRows.includes(item._id)}
                    >
                      {Constants.BUTTON_NAMES.APPROVE}
                      {loadingRows.includes(item._id) && <CircularProgress size={20} />}
                    </Button>
                    <Button
                      variant='contained'
                      color='secondary'
                      onClick={() => handleDelete(item._id)}
                      disabled={loadingRows.includes(item._id)}
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
      )}
    </>
  );
}

export default Approve;
