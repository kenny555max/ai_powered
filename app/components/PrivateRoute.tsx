'use client';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    const { data: session, status } = useSession();

    if (status === 'loading') return <div>Authenticating user.....</div>

    if (session === null) {
        redirect('/');
    }

    return (
        <>
            {children}
        </>
    )
}

export default PrivateRoute;