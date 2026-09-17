import type { InputData } from "@/shared/types/input/input";
import type { UseFormRegisterReturn } from "react-hook-form";

interface TableInputProps {
    input: InputData;
    registration: UseFormRegisterReturn;
    error?: string;
}

const SelectInput = ({ input, registration, error }: TableInputProps) => {
    if (input.type !== "select") return null;

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <select
                disabled={input.disabled}
                {...registration}
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
            {error && (
                <span style={{ color: "red", fontSize: "12px" }}>{error}</span>
            )}
        </div>
    );
};

const TextInput = ({ input, registration, error }: TableInputProps) => (
    <div style={{ display: "flex", flexDirection: "column" }}>
        <input
            type={input.type}
            placeholder={input.placeholder}
            disabled={input.disabled}
            {...registration}
        />
        {error && (
            <span style={{ color: "red", fontSize: "12px" }}>{error}</span>
        )}
    </div>
);

const NumberInput = ({ input, registration, error }: TableInputProps) => (
    <div style={{ display: "flex", flexDirection: "column" }}>
        <input
            type="number"
            step="any"
            placeholder={input.placeholder}
            disabled={input.disabled}
            {...registration}
        />
        {error && (
            <span style={{ color: "red", fontSize: "12px" }}>{error}</span>
        )}
    </div>
);

export const FormTableInput = (props: TableInputProps) => {
    switch (props.input.type) {
        case "select":
            return <SelectInput {...props} />;
        case "number":
            return <NumberInput {...props} />;
        case "file":
        case "dynamic":
        case "text":
        case "email":
        case "password":
            return <TextInput {...props} />;
        default:
            return null;
    }
};

export default FormTableInput;
