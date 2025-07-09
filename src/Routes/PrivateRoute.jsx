import React from 'react';

import { Navigate, useLocation } from 'react-router';
import Loading from '../Shared/Loading/Loading';
import useAuth from '../hook/useAuth';

const PrivateRoute = ({children}) => {
    const location = useLocation()
    const {user,loading}=useAuth()
    if(loading){
        return Loading
    }
    if(!user){
        return <Navigate state={{form : location.pathname}} to='/login'></Navigate>
    }
    return children
};

export default PrivateRoute;