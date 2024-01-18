//import React, { useEffect, useState } from 'react';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import SignUp from './pages/signUp/SignUp';
import NotFound from './pages/notFound/NotFound';
import './App.css';
import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import Admin from './pages/admin/Admin';
import Edit from './pages/admin/shared/edit/Edit';
import Approve from './pages/admin/shared/approve/Approve';
import List from './pages/list/List';
import Profile from './pages/profile/Profile';
import EditUser from './pages/admin/shared/edit/shared/editUser/EditUser';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/edit" element={<Edit />} />
        <Route path="/admin/approve" element={<Approve />} />
        <Route path="/admin/editUser" element={<EditUser />} />
        <Route path="/employee-list" element={<List />} />
        <Route path="/" element={<Home />} />
        <Route path="/*" element={<NotFound />} />{/*it's a 404 page*/}
      </Routes>
    </BrowserRouter>

  );
}

export default App;
