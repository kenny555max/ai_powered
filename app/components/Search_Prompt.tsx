import { Dispatch, SetStateAction } from "react";

const Search_Prompt = ({ search, setSearch, submitSearch }: { submitSearch: (event: React.KeyboardEvent<HTMLInputElement>) => void, search: string, setSearch: Dispatch<SetStateAction<string>> }) => {
    return (
        <div className="search_prompt w-[600px] mx-auto">
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="outline-none w-full py-2 px-3 rounded-sm shadow-xl"
                onKeyDown={submitSearch} placeholder="enter text to find prompts.........." />
        </div>
    )
}

export default Search_Prompt;