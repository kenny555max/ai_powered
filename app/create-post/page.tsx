// @ts-nocheck
'use client';
import { useRouter } from 'next/navigation';
import { Poppins } from 'next/font/google';
import { useState } from 'react';
import { useSession } from 'next-auth/react'

const poppins = Poppins({ subsets: ['latin'], weight: ['900'] });

type Post_Data = {
    post: string,
    tags: string,
    creator_id: string,
    creator_avatar: string,
    creator_email: string,
    creator_name: string
}

const Create = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const [post_data, set_post_data] = useState<Post_Data>({
        post: '',
        tags: '',
        creator_id: '',
        creator_avatar: '',
        creator_email: '',
        creator_name: ''
    });
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!session) return;

        if (!session.user) return;

        const { post, tags } = post_data;

        if (!post || tags.length === 0) return;

        try {
            setIsSubmitting(true);
            const res = await fetch('/api/prompt/create-post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...post_data,
                    tags: [...post_data.tags.split(' ')],
                    creator_id: session.user.id,
                    creator_avatar: session.user.image,
                    creator_email: session?.user.email,
                    creator_name: session.user.name
                })
            });

            if (!res.ok) throw new Error(`${res.statusText} failed with the ${res.status}`);

            console.log(await res.json());

            setIsSubmitting(false);

            router.push(`/my-profile/${session.user.id}`);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='create-post_container w-[600px] pb-10'>
            <div className="title my-16">
                <h1 className={`${poppins.className} text-6xl font-bold capitalize text-[blue]`}>create post</h1>
                <p className='capitalize'>create and share amazing prompt with the world, and let your imagination run wild with AI powered platform</p>
            </div>
            <form onSubmit={onSubmit} className='bg-gray-light p-6 rounded-md'>
                <div className="post mb-4">
                    <h1 className='mb-3'>Your AI Prompt</h1>
                    <textarea name='post' onChange={(e) => set_post_data({ ...post_data, post: e.target.value })} value={post_data.post} className='w-full p-2 rounded-md outline-none' placeholder='write your post here......' cols={30} rows={6}></textarea>
                </div>
                <div className="tags">
                    <h1 className='mb-3'>Field Of Prompt (separate tags with spaces)</h1>
                    <input type="text" name='tags' value={post_data.tags} onChange={(e) => set_post_data({ ...post_data, tags: e.target.value })} placeholder='#Tag' className='w-full outline-none p-2 rounded-md' />
                </div>
                <div className="action flex justify-end gap-x-4 mt-4">
                    <button type='button' className='py-1 px-4 bg-gray-dark rounded-xl text-white' onClick={() => router.back()}>cancel</button>
                    <button type='submit' className='bg-[orangered] py-1 px-4 rounded-xl text-white'>{isSubmitting ? 'creating...' : 'create'}</button>
                </div>
            </form>
        </div>
    )
}

export default Create;
