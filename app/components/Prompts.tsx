'use client';
import { Suspense, useState, useEffect, ReactEventHandler } from "react";
import Search_Prompt from "./Search_Prompt";
import All_Prompts, { PromptsProp } from "./All_Prompts";

const Prompts = () => {
    const [prompts, set_prompts] = useState<PromptsProp[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [search, setSearch] = useState<string>('');

    const fetch_prompts = async () => {
        try {
            const res = await fetch('/api/prompt/get_all');

            if (!res.ok) {
                throw new Error(`${res.statusText} with status code ${res.status}`);
            }

            const prompts = await res.json();

            setIsLoading(false);
            set_prompts(prompts);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetch_prompts();
    },[]);

    useEffect(() => {
        if (search.length === 0) {
            fetch_prompts();
        }
    },[search]);

    const submitSearch = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.keyCode === 13) {
            if (search.length === 0) {
                alert('Input cannot be empty');
                return;
            }

            try {
                const res = await fetch(`/api/prompt/get_all/search?query=${search}`);

                if (!res.ok) throw new Error(`${res.statusText} with a status code ${res.status}`);

                set_prompts(await res.json());
            } catch (error) {
                console.log(error);
            }
        }
    }

    const tagSearch = async (tag: string) => {
        try {
            const res = await fetch(`/api/prompt/get_all/search?query=${tag}`);

            if (!res.ok) throw new Error(`${res.statusText} with a status code ${res.status}`);

            set_prompts(await res.json());
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="prompts">
            <Search_Prompt search={search} submitSearch={submitSearch} setSearch={setSearch} />
            {isLoading
                ? <div className="mt-20">Loading prompts........</div> :
                prompts.length === 0
                    ? <div>no user has created any prompt yet...</div>
                    : <Suspense fallback={<div>Loading prompts.....</div>}>
                        <All_Prompts tagSearch={tagSearch} prompts={prompts} />
                    </Suspense>
            }
        </div>
    )
}

export default Prompts;