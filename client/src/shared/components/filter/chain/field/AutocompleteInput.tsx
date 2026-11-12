import { useEffect, useRef, useState } from "react";
import { filterFieldStyles } from "./styles";

interface Option {
    value: string;
    label: string;
}

interface Props {
    options: Option[];
    onSearch: (text: string) => void;
    /** Id de la opción confirmada, o `null` si no hay selección. */
    value: string | null;
    enabled: boolean;
    onChange: (value: string | null) => void;
    error?: boolean;
}

export default function AutocompleteInput({
    options,
    onSearch,
    value,
    enabled,
    onChange,
    error,
}: Props) {
    const [text, setText] = useState("");
    const [open, setOpen] = useState(false);
    /** Último valor informado por este input. */
    const reported = useRef<string | null>(null);

    // Cambio externo del valor (p. ej. se limpió el paso): reflejarlo en el texto.
    useEffect(() => {
        if (value === reported.current) return;
        reported.current = value;
        setText(
            value ? (options.find((o) => o.value === value)?.label ?? "") : "",
        );
    }, [value, options]);

    const report = (next: string | null) => {
        reported.current = next;
        onChange(next);
    };

    const confirm = (option: Option) => {
        setText(option.label);
        setOpen(false);
        report(option.value);
    };

    // Enter / blur: confirma solo si el texto coincide exacta y únicamente con una opción.
    const confirmIfExact = () => {
        const matches = options.filter((o) => o.label === text);
        if (matches.length === 1) confirm(matches[0]);
        else setOpen(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!enabled) return;
        setText(e.target.value);
        setOpen(true);
        if (value !== null) report(null); // editar el texto invalida la selección
        onSearch(e.target.value);
    };

    return (
        <div className={filterFieldStyles.autocomplete}>
            <input
                className={filterFieldStyles.control({ error })}
                type="text"
                disabled={!enabled}
                value={text}
                onChange={handleChange}
                onFocus={() => setOpen(true)}
                onBlur={confirmIfExact}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        e.preventDefault();
                        confirmIfExact();
                    }
                }}
            />
            {enabled && open && options.length > 0 && (
                <ul
                    role="listbox"
                    className={filterFieldStyles.options}
                >
                    {options.map((o) => (
                        <li
                            key={o.value}
                            role="option"
                            aria-selected={o.value === value}
                            className={filterFieldStyles.option}
                            onMouseDown={(e) => {
                                e.preventDefault();
                                confirm(o);
                            }}
                        >
                            {o.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
