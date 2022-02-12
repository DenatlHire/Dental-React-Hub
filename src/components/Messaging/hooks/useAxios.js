import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export function useAxios(staticUrl, { loadingByDefault }) {
    const requestRef = useRef();
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(loadingByDefault || false);

    useEffect(() => {
        if (staticUrl) {
            requestRef.current = makeRequest;
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

    const refetch = requestRef.current;

    return [response, error, loading, refetch];
}