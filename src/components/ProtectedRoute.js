import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({userIsLoggedIn, redirectPath}) => {
    if(redirectPath === "/dashboard"){
        return userIsLoggedIn ? <Navigate to={redirectPath}/> : <Outlet/>;
    }
    return userIsLoggedIn ? <Outlet /> : <Navigate to={redirectPath} />;
}

export default ProtectedRoute;