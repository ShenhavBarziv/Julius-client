// components/List/List.tsx
import React, { useEffect, useState } from 'react';
import "./styles.css"
import type { UserData, ResponeType } from "./types"
import Navbar from '../../components/navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import listApi from '../../api/user/listApi';

function List() {
  const navigate = useNavigate();
  const [data, setData] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    listApi.getListData()
      .then(response => {
        setData(response.data.data);
        setAdmin(response.data.admin);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Navbar admin={admin} />
      {loading ? (
        <p className='loading'>Loading data...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Job</th>
              <th>Email</th>
              <th>Position</th>
              <th>Phone Number</th>
              <th>Hire Date</th>
              <th>Birth Date</th>
              <th>Admin</th>
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
                <td>{(item.admin === true).toString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default List;
