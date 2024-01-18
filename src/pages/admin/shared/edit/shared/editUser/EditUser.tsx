import React, { useEffect, useState } from 'react';
import Navbar from '../../../../../../components/navbar/Navbar';
import type { UserData, ResponeData } from './types';
import editApi from '../../../../../../api/admin/editUserApi';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';

function EditUser() {
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state;
  const [userData, setUserData] = useState<UserData | null>(null);
  const [msg, setMsg] = useState('Loading user profile...');
  const [cookies, removeCookie] = useCookies(['token']);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!cookies || !cookies.token) {
          navigate('/login');
        }

        const response = await editApi.fetchData();

        if (response.data.status) {
          if (response.data.admin) {
            setAdmin(true);
            setUserData(response.data.data.find((user: UserData) => user._id === userId) || null);
          } else {
            alert('Access denied');
            navigate('/profile');
          }
        } else {
          document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
          navigate('/login');
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setMsg('Error');
      }
    };

    fetchData();
  }, [userId, navigate, cookies]);

  const handleInputChange = (key: string, value: string | boolean) => {
    setUserData((prevUserData: UserData | null) => ({
      ...prevUserData!,
      [key]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await editApi.saveUserChanges(userId, userData!);

      if (response.data.data.code === 200) {
        navigate('/admin/edit');
      } else {
        alert(response.data.data.msg);
        navigate('/profile');
      }
    } catch (error) {
      console.error('Error updating user data:', error);
      alert('Error');
    }
  };

  return (
    <>
      <Navbar admin={admin} />
      <div className="user-profile">
        <h1>Edit User</h1>
        {userData ? (
          <form>
            {Object.entries(userData).map(([key, value]) => (
              <div key={key} className="form-group">
                <label>{key}:</label>
                {key === 'admin' ? (
                  <input
                    type="checkbox"
                    checked={!!value}
                    onChange={(e) => handleInputChange(key, e.target.checked)}
                  />
                ) : key === 'birthDate' || key === 'hireDate' ? (
                  <input
                    type="date"
                    value={value as string} // assuming value is a string
                    onChange={(e) => handleInputChange(key, e.target.value)}
                  />
                ) : (
                  <input
                    type="text"
                    value={value as string} // assuming value is a string
                    onChange={(e) => handleInputChange(key, e.target.value)}
                  />
                )}
              </div>
            ))}
            <button type="button" onClick={handleSave}>
              Save
            </button>
          </form>
        ) : (
          <p className="loading">{msg}</p>
        )}
      </div>
    </>
  );
}

export default EditUser;
