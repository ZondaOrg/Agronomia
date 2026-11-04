import { SearchInput } from "@/shared/components/searcher/components/SearchInput";
import { container } from "@/shared/components/searcher/styles";
import { useState, useEffect } from "react";
import useSearch from "@/shared/hooks/use-search";

export const SearchProvider = () => {
    const { search, handleSearch } = useSearch();
    const [value, setValue] = useState(search);

    useEffect(() => {
        const timeout = setTimeout(() => handleSearch(value), 400);

        return () => clearTimeout(timeout);
    }, [value, handleSearch]);

    return (
        <div className={container}>
            <h2>Buscar</h2>
            <SearchInput
                value={value}
                onChange={setValue}
                placeholder="Nombre"
            />
        </div>
    );
};
