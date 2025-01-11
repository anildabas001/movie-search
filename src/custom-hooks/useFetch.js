import { useState, useEffect } from 'react';

export default function useFetch (url) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchData() {

            if (!url) {
                return;
            }

            setLoading(true);
            try {
                let response = await fetch (url);

                if (!response.ok) {
                    throw new Error('Data Fetching Failed.');
                }

                let data = await response.json();

                setData(data);
            } catch (err) {
                setError(true);
            } finally {
                setLoading(false);
            }
        }

        fetchData();       
    }, [url]);

    return [data, error, loading];
}