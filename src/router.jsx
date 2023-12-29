import React, { useContext } from 'react'

import PrivateRoutes from './pages/privateRoutes';
import PublicRoutes from './pages/publicRoutes';
import { UserContext } from './app';

const RouterComp = () => {

    const user = useContext(UserContext);
    const isLogin = JSON.parse(localStorage.getItem('isLogin'));
    return (
        <>
            {
                user.user && isLogin ? <PrivateRoutes /> : <PublicRoutes />
            }
        </>
    )
}

export default RouterComp