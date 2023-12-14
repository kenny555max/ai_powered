// @ts-nocheck
'use client';
import { useSession, signIn, signOut, getProviders, ClientSafeProvider } from "next-auth/react";
import Image from "next/image";
import logo from '../../public/images/logo.svg';
import Link from "next/link";
import { useEffect, useState } from "react";

const Header = () => {
    const [providers, setProviders] = useState<Record<string, ClientSafeProvider> | null>(null);
    const { data: session } = useSession();

    useEffect(() => {
        (async () => {
            const res = await getProviders();
            setProviders(res);
        })();
    },[]);

    return (
        <div className="header h-[60px]">
            <div className="flex justify-between items-center h-full">
                <Link href='/' className="logo flex gap-x-2 items-center">
                    <Image
                        src={logo}
                        alt="promtopia_logo"
                        height='30'
                        width='30'
                    />
                    <h1 className="capitalize font-bold text-xl">promtopia</h1>
                </Link>
                <div className="auth flex items-center gap-x-4">
                    {session && session.user ? (
                        <>
                            <Link href='/create-post' className="capitalize py-1 px-3 transition-all border-[1px] rounded-[20px] bg-black text-white hover:bg-white hover:text-black">create post</Link>
                            <button type="button" className="capitalize py-1 px-3 transition-all border-[1px] rounded-[20px] hover:bg-black hover:text-white" onClick={() => signOut()}>sign out</button>
                            <Link href={`/my-profile/${session.user.id}`} className="profile_logo">
                                <Image
                                    src={session.user.image!}
                                    alt="promtopia_logo"
                                    height='30'
                                    width='30'
                                    className="rounded-full"
                                />
                            </Link>
                        </>
                    ) : (
                            <>
                                <button
                                    type="button"
                                    onClick={() => signIn(providers.google.id)}
                                    className="capitalize py-1 px-3 transition-all border-[1px] rounded-[20px] hover:bg-black hover:text-white">sign in</button>
                            </>    
                        )}
                </div>
            </div>
        </div>
    )
}

export default Header;
