import React from 'react'
import PrivateRoute from '../components/PrivateRoute';

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <PrivateRoute>
            {children}
        </PrivateRoute>
    )
}

export default Layout;