import { useEffect, useState } from 'react';
import { useFetch } from '../hooks/useFetch';
import { Input } from './input';
import { iConversation, iError, iResponse } from '../data/interfaces';
import { characters } from '../data/characters';

export const AiChat = () => {
    const [question, setQuestion] = useState('');
    const [conversation, setConversation] = useState<iConversation[]>([]);

    const character = characters[1];

    const endpoint = `/api/generate`;

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(
            `The following is a conversation with ${character.name}. ${character.description} ` +
                [...conversation] +
                question
        ),
    };

    const { data, error, loading, getData } = useFetch<iResponse, iError>(
        endpoint,
        false,
        options
    );

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await getData();
    };

    useEffect(() => {
        if (data) {
            setConversation([
                ...conversation,
                { human: question, ai: data.result },
            ]);
            setQuestion('');
        }
    }, [data]);

    const handleChange = (text: string) => {
        setQuestion(text);
    };

    return (
        <main className='flex flex-col space-y-4 p-6 w-full max-w-xl lg:space-y-6'>
            <Input
                text={question}
                placeholder={`Ask ${character.name} anything...`}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
            {(loading || error || data) && (
                <div className='p-6 w-full h-[75vh] overflow-y-auto shadow-lg shadow-slate-200 text-gray-500'>
                    {error && (
                        <h2 className='text-red-500 font-bold'>
                            Error processing request. Please try again.
                        </h2>
                    )}
                    {data && (
                        <>
                            {conversation.map((question, index) => (
                                <div key={index}>
                                    <p>
                                        <span className='font-bold'>You:</span>{' '}
                                        {question.human}
                                    </p>
                                    <p>
                                        <span className='font-bold'>
                                            {character.name}:
                                        </span>{' '}
                                        {question.ai}
                                    </p>
                                </div>
                            ))}
                            {/* <p>{data.result}</p> */}
                        </>
                    )}
                    {loading && <h2 className='text-gray-500'>Loading...</h2>}
                </div>
            )}
        </main>
    );
};
