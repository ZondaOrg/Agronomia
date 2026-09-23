import { SearchInput } from "./components/SearchInput";
import type { SearcherProps } from "./types";

export const Searcher = ({title, placeholder, value, onChange}: SearcherProps) => {
    return (
        <div>
            <h2>{title}</h2>
            <SearchInput
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
        </div>
    );
};
