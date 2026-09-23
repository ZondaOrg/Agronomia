import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { SearchInput } from "./components/SearchInput";
import type { SearcherProps } from "./types";

export const Searcher = ({title, placeholder}: SearcherProps) => {
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
        <div>
            <h2>{title}</h2>
            <SearchInput
                value={value}
                onChange={setValue}
                placeholder={placeholder}
            />
        </div>
    );
};
