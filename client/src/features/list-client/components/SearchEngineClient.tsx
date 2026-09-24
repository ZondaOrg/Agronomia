import { SearchInput } from "@/shared/components/searcher/components/SearchInput";
import { css } from "@styled-system/css";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

const SearchEngineClient = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [value, setValue] = useState(searchParams.get("search") ?? "");

    useEffect(() => {
        const timeout = setTimeout(() => {
            setSearchParams((prev) => {
                const next = new URLSearchParams(prev);
                if (value) {
                    next.set("search", value);
                } else {
                    next.delete("search");
                }
                return next;
            });
        }, 400);

        return () => clearTimeout(timeout);
    }, [value, setSearchParams]);

    return (
        <div className={css({w: "100%"})}>
            <h2>Buscar</h2>
            <SearchInput
                value={value}
                onChange={setValue}
                placeholder="Nombre"
            />
        </div>
    );
};

export default SearchEngineClient;