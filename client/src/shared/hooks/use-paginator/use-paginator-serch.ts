import { useCallback, useEffect, useState } from "react";
import useSearch from "../use-search";

export const usePaginatedWithSerch = <T, Args extends unknown[]>(
    serviceFunction: (page: number, size: number, search: string, ...args: Args) => Promise<T>,
    defaultSize = 4,
    args: Args
) => {
    const [currentPage, setCurrentPage] = useState(0);
    const { search, handleSearch } = useSearch();

    const onSearch = useCallback(
        (newSearch: string) => handleSearch(newSearch),
        [handleSearch],
    );

    const onChangePage = useCallback((page: number) => {
        setCurrentPage(page);
    }, []);

    const handleChange = useCallback((page: number) => {
        setCurrentPage(page);
    }, []);

    useEffect(() => {
        serviceFunction(currentPage, defaultSize, search, ...args);
    }, [args, currentPage, defaultSize, search, serviceFunction]);

    return { currentPage, search, handleChange, onSearch, onChangePage }

};

export default usePaginatedWithSerch;
