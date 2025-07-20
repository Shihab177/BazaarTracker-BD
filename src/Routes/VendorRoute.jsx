import React from 'react';

import Loading from '../Shared/Loading/Loading';
import useAuth from '../hook/useAuth';
import useUserRole from '../hook/useUserRole';

const VendorRoute = ({children}) => {
   const { user, loading } = useAuth();
    const { role, roleLoading } = useUserRole();

    if (loading || roleLoading) {
        return <Loading></Loading>
    }

    if (!user || role !== 'vendor') {
        return <Navigate state={{ from: location.pathname }} to="/Forbidden"></Navigate>
    }

    return children;
};



export default VendorRoute;