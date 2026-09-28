import { useCallback, useState } from "react";
import type { UseFetch } from "./use-fetch";
import { HttpError } from "@/core/server/errors/http-error";

function useFetch<D>(): UseFetch<D> {
    const [data, setData] = useState<D>();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<HttpError>();

    const execute = useCallback(
        <Args extends unknown[]>(request: (...args: Args) => Promise<D>) => {
            return async (...args: Args) => {
                setIsLoading(true);
                setError(undefined);

                try {
                    const data = await request(...args);
                    setData(data);
                    return data;
                } catch (error: unknown) {
                    if (error instanceof HttpError) {
                        setError(error);
                    }
                    throw error;
                } finally {
                    setIsLoading(false);
                }
            };
        },
        [],
    );

    function refresh() {
        setData(undefined);
        setError(undefined);
    }

    return { data, isLoading, error, execute, refresh };
}

export default useFetch;
