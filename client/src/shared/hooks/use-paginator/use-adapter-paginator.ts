import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import useFetch from "../use-fetch/useFetch.hook";

export const useAdapterPaginatedFetch = <T, Args extends unknown[]>(
    serviceFunction: (page: number, size: number, search: string, ...args: Args) => Promise<T>,
    defaultSize = 4,
    args: Args
) => {
    const [searchParams] = useSearchParams();
    const search = searchParams.get("search") ?? "";
    const { data, error, isLoading, execute, refresh } = useFetch<T>();
    const [currentPage, setCurrentPage] = useState(0);

    const onSearchPage = useCallback(
        (page: number) => {
            setCurrentPage(page);
            return execute(serviceFunction)(page, defaultSize, search, ...args);
        },
        [execute, serviceFunction, defaultSize, search, args]
    );

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        onSearchPage(0)
    }, [onSearchPage, search]);

    return {
        data,
        error,
        isLoading,
        currentPage,
        onSearchPage,
        refresh,
    };
};

export default useAdapterPaginatedFetch;
