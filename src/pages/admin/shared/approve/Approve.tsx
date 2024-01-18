import React, { useEffect, useState } from 'react';
import Navbar from '../../../../components/navbar/Navbar';
import './styles.css';
import approveApi from '../../../../api/admin/approveApi';
import { useNavigate } from 'react-router-dom';
import type { UserData } from './types'; // Import the UserData type

function Approve() {
  const [data, setData] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<string | null>(null);
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(false);

  const fetchData = async () => {
    try {
      const result = await approveApi.fetchData();
      if (result.success) {
        setData(result.data);
        setAdmin(true);
      } else if (result.message === 'notAdmin') {
        alert('Access Denied: You are not an admin.');
        navigate('/profile');
      } else if (result.message === 'notLoggedIn') {
        alert('Access Denied: Please log in to view this page.');
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
      const result = await approveApi.approveUser(id);
      if (!result.success) {
        alert(result.message);
      }
    } finally {
      fetchData();
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const result = await approveApi.deleteUser(id);
      if (!result.success) {
        alert(result.message);
      }
    } finally {
      fetchData();
    }
  };

  return (
    <>
      <Navbar admin={admin} />
      {loading ? (
        <p className='loading'>Loading data...</p>
      ) : status === 'notAdmin' ? (
        <p className='error-message'>Access Denied: You are not an admin.</p>
      ) : status === 'notLoggedIn' ? (
        <p className='error-message'>Access Denied: Please log in to view this page.</p>
      ) : (
        <table className='user-table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Job</th>
              <th>Email</th>
              <th>Position</th>
              <th>Phone Number</th>
              <th>Hire Date</th>
              <th>Birth Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.job}</td>
                <td>{item.email}</td>
                <td>{item.position}</td>
                <td>{item.phoneNumber}</td>
                <td>{item.hireDate}</td>
                <td>{item.birthDate}</td>
                <td>
                  <button
                    className='approve'
                    onClick={() => handleApprove(item._id)}
                  >
                    Approve
                  </button>
                  <button
                    className='delete'
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default Approve;
