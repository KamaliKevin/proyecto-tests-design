import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ userIsLoggedIn }) => { // Temporarily hard-code for debugging
    const token = localStorage.getItem("XSRF-TOKEN");
    if (token) {
        userIsLoggedIn = true;
    }
    return userIsLoggedIn ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

export default ProtectedRoute;