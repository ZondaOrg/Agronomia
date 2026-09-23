import { useState } from "react";
import { useSearchParams } from "react-router";

const useSearch = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [search, setSearch] = useState(searchParams.get("search") ?? "");

    function handleSearch(newSearch: string) {
        setSearchParams((prev) => {
            const next = new URLSearchParams(prev);
            next.set("search", newSearch);
            return next;
        });
        setSearch(newSearch);
    }

    return { search, handleSearch }
}

export default useSearch;