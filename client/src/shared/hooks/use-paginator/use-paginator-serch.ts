import { useEffect, useState } from "react";
import useSearch from "../use-search";

export const usePaginatedWithSerch = <T, Args extends unknown[]>(
    serviceFunction: (page: number, size: number, search: string, ...args: Args) => Promise<T>,
    defaultSize = 4,
    args: Args
) => {
    const [currentPage, setCurrentPage] = useState(0);
    const { search, handleSearch } = useSearch();

    function onSearch(search: string) {
        serviceFunction(currentPage, defaultSize, search, ...args);
        handleSearch(search);
    }

    function onChangePage(page: number, size: number, search: string) {
        setCurrentPage(page); 
        serviceFunction(page, size, search, ...args);
    }

    useEffect(() => {
        const fn = () => onChangePage(currentPage, defaultSize, search);
        fn();
    }, []);

    return { currentPage, search, onSearch, onChangePage }

};

export default usePaginatedWithSerch;
