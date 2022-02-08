import { useState, useEffect } from 'react';
import axios from 'axios';

export function useAxios(staticUrl, { loadingByDefault }) {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(loadingByDefault || false);

    useEffect(() => {
        if (staticUrl) {
            makeRequest();
        }

        async function makeRequest() {
            setLoading(true);
            try {
                const { data } = await axios.get(staticUrl);
                setResponse(data);
                setError(null);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        }
    }, [staticUrl]);

    return [response, error, loading];
}