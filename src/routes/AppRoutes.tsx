import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from '../pages/home/Home';
import SignUp from '../pages/signup/SignUp';
import Login from '../pages/login/Login';
import Profile from '../pages/profile/Profile';
import EmployeeList from '../pages/employeeList/EmployeeList';
import AdminPage from '../pages/admin/AdminPage';
import ApproveUsers from '../pages/admin/shared/approveUsers/ApproveUsers';
import UsersAdminList from '../pages/admin/shared/manageUsers/UsersAdminList';
import EditUser from '../pages/admin/shared/manageUsers/shared/EditUser';

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/employee-list" element={<EmployeeList />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/admin/approve" element={<ApproveUsers />} />
                <Route path="/admin/manage" element={<UsersAdminList />} />
                <Route path="/admin/editUser" element={<EditUser />} />
                <Route path="/*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}
function NotFound() {
    return <Navigate to="/" />;
}

export default AppRoutes;
