import { SearchInput } from "./components/SearchInput";
import { container } from "./styles";
import type { SearcherProps } from "./types";

export const Searcher = ({title, placeholder, value, onChange}: SearcherProps) => {
    return (
        <div className={container}>
            <h2>{title}</h2>
            <SearchInput
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
        </div>
    );
};
