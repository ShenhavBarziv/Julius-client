import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/home/Home';
import Login from '../pages/login/Login';
import SignUp from '../pages/signUp/SignUp';
import NotFound from '../pages/notFound/NotFound';
import Admin from '../pages/admin/Admin';
import Edit from '../pages/admin/shared/edit/Edit';
import Approve from '../pages/admin/shared/approve/Approve';
import EmployeeList from '../pages/employeeList/EmployeeList';
import Profile from '../pages/profile/Profile';
import EditUser from '../pages/admin/shared/edit/shared/editUser/EditUser';
import { useAuth } from '../context/AuthContext';

function AppRoutes() {
    const { user } = useAuth();
    const isAdmin = user && user.admin;
    console.log(user)
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} />

            {/* Protected routes */}
            {isAdmin && (
                <>
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/admin/edit" element={<Edit />} />
                    <Route path="/admin/approve" element={<Approve />} />
                    <Route path="/admin/editUser" element={<EditUser />} />
                </>
            )}

            <Route path="/employee-list" element={<EmployeeList />} />
            <Route path="/" element={<Home />} />
            <Route path="/*" element={<NotFound />} />
        </Routes>
    );
}

export default AppRoutes;
