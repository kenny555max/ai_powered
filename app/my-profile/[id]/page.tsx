'use client';
import { Poppins } from 'next/font/google';
import { Suspense, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import All_Prompts from '../../components/All_Prompts';
const poppins = Poppins({ subsets: ['latin'], weight: ['900'] });
import { useParams } from 'next/navigation';

const Profile = () => {
    const { data: session } = useSession();
    const params = useParams();
    const [prompts, setPrompts] = useState([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetch_prompts = async () => {
            try {
                const res = await fetch(`http://localhost:3000/api/prompt/get_all/${params.id}`);

                const prompts = await res.json();

                setIsLoading(false);
                setPrompts(prompts);
            } catch (error) {
                console.log(error);
            }
        }

        fetch_prompts();
    },[params]);

    return (
        <div className="profile pb-10">
            <div className="title my-16">
                <h1 className={`${poppins.className} mb-4 sm:text-4xl lg:text-6xl font-bold capitalize text-[blue]`}>{session && session.user && session.user.id === params.id ? 'My Profile' : `${session && session.user && session.user.name}'s Profile`}</h1>
                <p className='capitalize'>create and share amazing prompt with the world, and let your imagination run wild with AI powered platform</p>
            </div>
            {isLoading
                ? <div>Loading prompts........</div> :
                prompts.length === 0
                    ? <div>You have not created any post yet...</div>
                    : <Suspense fallback={<div>Loading your prompts.....</div>}>
                        <All_Prompts prompts={prompts} />
                    </Suspense>
            }
        </div>
    )
}

export default Profile;