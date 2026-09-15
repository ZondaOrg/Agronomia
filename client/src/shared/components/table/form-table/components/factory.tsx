import type { InputData } from "@/shared/types/input/input";

interface TableInputProps {
    input: InputData;
    value: unknown;
    onChange: (value: string) => void;
}

const SelectInput = ({ input, value, onChange }: TableInputProps) => {
    if (input.type !== "select") {
        return null;
    }

    return (
        <select
            value={String(value ?? input.defaultValue ?? "")}
            disabled={input.disabled}
            onChange={(event) => onChange(event.target.value)}
        >
            {input.options.map((option) => (
                <option
                    key={option.id}
                    value={option.value}
                >
                    {option.label}
                </option>
            ))}
        </select>
    );
};

const TextInput = ({ input, value, onChange }: TableInputProps) => (
    <input
        type={input.type}
        placeholder={input.placeholder}
        value={String(value ?? input.defaultValue ?? "")}
        disabled={input.disabled}
        onChange={(event) => onChange(event.target.value)}
    />
);

export const FormTableInput = ({ input, value, onChange }: TableInputProps) => {
    switch (input.type) {
        case "select":
            return (
                <SelectInput
                    input={input}
                    value={value}
                    onChange={onChange}
                />
            );
        case "file":
        case "dynamic":
        case "text":
        case "number":
        case "email":
        case "password":
            return (
                <TextInput
                    input={input}
                    value={value}
                    onChange={onChange}
                />
            );
    }
};

export default FormTableInput;
