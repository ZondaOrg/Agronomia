import { useCallback, useRef, useState } from "react";
import type { UseFetch } from "./use-fetch";
import { HttpError } from "@/core/server/errors/http-error";
import useErrorFetch from "./use-error-fetch";

function useFetch<D>(): UseFetch<D> {
    const [data, setData] = useState<D>();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<HttpError>();
    const { handleError } = useErrorFetch();
    const requestId = useRef(0);

    const execute = useCallback(
        <Args extends unknown[]>(request: (...args: Args) => Promise<D>) => {
            return async (...args: Args) => {
                const id = ++requestId.current;
                setIsLoading(true);
                setError(undefined);

                try {
                    const result = await request(...args);
                    if (id === requestId.current) setData(result);
                    return result;
                } catch (error: unknown) {
                    if (
                        id === requestId.current &&
                        error instanceof HttpError
                    ) {
                        handleError(error);
                        setError(error);
                    }
                    throw error;
                } finally {
                    if (id === requestId.current) setIsLoading(false);
                }
            };
        },
        [handleError],
    );

    const refresh = useCallback(() => {
        requestId.current++;
        setData(undefined);
        setError(undefined);
        setIsLoading(false);
    }, []);

    return { data, isLoading, error, execute, refresh };
}

export default useFetch;
