import Image from 'next/image';
import icon from '../../public/icons/copy.svg';
import { PromptsProp } from './All_Prompts';
import Link from 'next/link';

const Prompt = ({ prompt, tagSearch }: { prompt: PromptsProp, key: number, tagSearch: (search: string) => void }) => {
    const { creator_avatar, creator_email, creator_name, tags, post, creator_id } = prompt;

    return (
        <div className="prompt p-4 h-auto rounded-[10px]" style={{ boxShadow: '0 0 2px 1px rgba(0,0,0,0.4)' }}>
            <div className="profile_info flex flex-wrap justify-between items-center">
                <Link href={`/my-profile/${creator_id}`}>
                    <Image
                        src={creator_avatar}
                        alt='user_logo'
                        height='25'
                        width='25'
                    />
                </Link>
                <div className="user_info mb-4">
                    <p>{creator_name}</p>
                    <p>{creator_email}</p>
                </div>
                <div className="action">
                    <Image
                        src={icon}
                        alt='copied'
                        height='10'
                        width='10'
                    />
                </div>
            </div>
            <div className="prompt_dsc">
                <p>{post.length > 200 ? post.slice(0, 200) + '...' : post}</p>
            </div>
            <div className="prompt_tags flex mt-6 gap-x-2 flex-wrap">
                {tags.map((tag: string) => {
                    return <button type='button' onClick={() => tagSearch(tag)} className='text-[blue]' key={tag}>#{tag}</button>
                })}
            </div>
        </div>
    )
}

export default Prompt;