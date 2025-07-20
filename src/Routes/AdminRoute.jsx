import React, { Children } from 'react';


import { Navigate } from 'react-router';

import Loading from '../Shared/Loading/Loading';
import useAuth from '../hook/useAuth';
import useUserRole from '../hook/useUserRole';

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const { role, roleLoading } = useUserRole();

    if (loading || roleLoading) {
        return <Loading></Loading>
    }

    if (!user || role !== 'admin') {
        return <Navigate state={{ from: location.pathname }} to="/Forbidden"></Navigate>
    }

    return children;
};

export default AdminRoute;