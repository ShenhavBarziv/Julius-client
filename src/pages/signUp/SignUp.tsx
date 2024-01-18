import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./styles.css";
import signupApi from '../../api/signupApi';

function SignUp() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    name: '',
    job: '',
    birthDate: '',
    phoneNumber: '',
    position: '',
    hireDate: '',
  });

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    // Update the form values on each keystroke
    const { name, value } = e.currentTarget;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const result = await signupApi.signUpUser(userData);

      if (result.success) {
        alert(result.message);
        navigate('/login', { state: userData.email });
      } else {
        alert(result.message);
      }
    } catch (error) {
      alert("Error creating user");
      console.error('Error during signup:', error);
    }
  };

  return (
    <>
      <div className='SignUpForm'>
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          {/* ... (rest of your form) ... */}
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </>
  );
};

export default SignUp;
