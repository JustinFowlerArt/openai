import { useCallback, useEffect, useState } from 'react';

export const useFetch = <T, E>(
    url: string,
    immediate: boolean,
    options?: RequestInit
) => {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<E | null>(null);
    const [loading, setLoading] = useState(false);

    const getData = useCallback(async () => {
        setLoading(true);
        setData(null)
        setError(null);
        try {
            const response = await fetch(url, options);
            if (response.ok) {
                const json = await response.json();
                setData(json);
            } else {
                const json = await response.json();
                throw json;
            }
        } catch (error) {
            setError(error as E);
        } finally {
            setLoading(false);
        }
    }, [url, options]);

    useEffect(() => {
        if (immediate) {
            getData();
        }
    }, [getData, immediate]);

    return { data, error, loading, getData };
};
