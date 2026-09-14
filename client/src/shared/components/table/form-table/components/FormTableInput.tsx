import type { InputType, Option } from "@/shared/types/input/input";
import { control } from "../style";

interface FormTableInputProps {
    type: InputType;
    value: unknown;
    placeholder?: string;
    options?: Option[];
    onChange: (value: string) => void;
}

export const FormTableInput = ({
    type,
    value,
    placeholder,
    options,
    onChange,
}: FormTableInputProps) => {
    if (type === "select") {
        return (
            <select
                className={control}
                value={String(value ?? "")}
                onChange={(event) => onChange(event.target.value)}
            >
                {options?.map((option) => (
                    <option
                        key={option.id}
                        value={option.value}
                    >
                        {option.label}
                    </option>
                ))}
            </select>
        );
    }

    return (
        <input
            className={control}
            type={type}
            placeholder={placeholder}
            value={String(value ?? "")}
            onChange={(event) => onChange(event.target.value)}
        />
    );
};
