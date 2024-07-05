import Prompt from "./Prompt";

export type PromptsProp = {
    post: '',
    tags: '',
    creator_id: '',
    creator_avatar: '',
    creator_email: '',
    creator_name: ''
}

const All_Prompts = ({ prompts, tagSearch }: { prompts: PromptsProp[], tagSearch: (search: string) => void }) => {
    return (
        <div className='all_prompts grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-20 gap-4'>
            {prompts?.map((prompt, index) => {
                return <Prompt prompt={prompt} tagSearch={tagSearch} key={index} />
            })}
        </div>
    )
}

export default All_Prompts;