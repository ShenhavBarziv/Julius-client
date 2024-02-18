import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from '../pages/home/Home';
import SignUp from '../pages/signup/SignUp';
import Login from '../pages/login/Login';
import { AuthProvider } from '../context/AuthContext';
import Profile from '../pages/profile/Profile';
import EmployeeList from '../pages/employeeList/EmployeeList';
import AdminPage from '../pages/admin/AdminPage';
import ApproveUsers from '../pages/admin/shared/approveUsers/ApproveUsers';

function NotFound() {
    return <Navigate to="/" />;
}
function AppRoutes() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/employee-list" element={<EmployeeList />} />
                    <Route path="/admin" element={<AdminPage />} />
                    <Route path="/admin/approve" element={<ApproveUsers />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default AppRoutes;
