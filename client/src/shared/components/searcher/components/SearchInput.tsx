import { SearchIcon } from "../../icon/components/icons/Search";
import { styles } from "./styles";

type SearchInputProps = {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
};

export const SearchInput = ({
    value,
    onChange,
    placeholder,
}: SearchInputProps) => {
    const { wrapper, icon, input } = styles();

    return (
        <div className={wrapper}>
            <SearchIcon className={icon} />
            <input
                type="text"
                className={input}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
            />
        </div>
    );
};
