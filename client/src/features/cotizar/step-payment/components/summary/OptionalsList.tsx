import { optionalList } from "./styles";

interface OptionalsListProps {
    optionals: string[];
}

export const OptionalsList = ({ optionals }: OptionalsListProps) => (
    <ul className={optionalList}>
        {optionals.length ? (
            optionals.map((optional, index) => (
                <li key={optional}>
                    {optional}
                    {index < optionals.length - 1 ? "," : ""}
                </li>
            ))
        ) : (
            <li>Ninguno</li>
        )}
    </ul>
);
