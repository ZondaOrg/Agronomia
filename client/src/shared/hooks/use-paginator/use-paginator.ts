import { useState, useCallback } from "react";
import useFetch from "@/shared/hooks/use-fetch/useFetch.hook";

export const usePaginatedFetch = <T, Args extends unknown[]>(
    serviceFunction: (page: number, size: number, ...args: Args) => Promise<T>,
    defaultSize = 4,
) => {
    const { data, error, isLoading, execute, refresh } = useFetch<T>();

    const [currentPage, setCurrentPage] = useState(0);
    const [fetchArgs, setFetchArgs] = useState<Args>();

    const fetchPage = useCallback(
        (page: number, size: number = defaultSize, ...args: Args) => {
            setCurrentPage(page);
            setFetchArgs(args);
            return execute(serviceFunction)(page, size, ...args);
        },
        [execute, serviceFunction, defaultSize],
    );

    const handlePageChange = useCallback(
        (newPage: number) => {
            if (fetchArgs) {
                fetchPage(newPage, defaultSize, ...fetchArgs);
            }
        },
        [fetchPage, fetchArgs, defaultSize],
    );

    return {
        data,
        error,
        isLoading,
        currentPage,
        fetchPage,
        handlePageChange,
        refresh,
    };
};
