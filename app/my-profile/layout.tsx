import React from 'react'
import PrivateRoute from '../components/PrivateRoute';

const My_Profile_Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <PrivateRoute>
            {children}
        </PrivateRoute>
    )
}

export default My_Profile_Layout;