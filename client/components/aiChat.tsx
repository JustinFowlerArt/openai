import { useEffect, useState } from 'react';
import { useFetch } from '../hooks/useFetch';
import { Input } from './input';
import { iError, iResponse } from './interfaces';

export const AiChat = () => {
    const [question, setQuestion] = useState('');

    const endpoint = `/api/generate`;

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(question),
    };

    const { data, error, loading, getData } = useFetch<iResponse, iError>(
        endpoint,
        false,
        options
    );

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await getData();
        setQuestion('');
    };

    const handleChange = (text: string) => {
        setQuestion(text);
    };

    return (
        <main className='flex flex-col space-y-4 p-6 w-full max-w-xl lg:space-y-6'>
            <Input
                question={question}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
            {(loading || error || data) && (
                <div className='p-6 w-full max-w-xl shadow-lg shadow-slate-200'>
                    {loading && <h2 className='text-gray-500'>Loading...</h2>}
                    {error && (
                        <h2 className='text-red-500 font-bold'>
                            Error processing request. Please try again.
                        </h2>
                    )}
                    {data && <p className='text-slate-500'>{data.result}</p>}
                </div>
            )}
        </main>
    );
};
