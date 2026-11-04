import { useCallback } from "react";
import { useSearchParams } from "react-router";

const useSearch = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const search = searchParams.get("search") ?? "";

    const handleSearch = useCallback((newSearch: string) => {
        setSearchParams((prev) => {
            const next = new URLSearchParams(prev);
            if (newSearch) {
                next.set("search", newSearch);
            } else {
                next.delete("search");
            }
            return next;
        });
    }, [setSearchParams]);

    return { search, handleSearch }
}

export default useSearch;
