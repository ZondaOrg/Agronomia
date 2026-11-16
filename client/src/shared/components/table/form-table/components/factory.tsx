import type { InputData } from "@/shared/types/input/input";
import type { UseFormRegisterReturn } from "react-hook-form";
import { styles } from "./styles";

interface TableInputProps {
    input: InputData;
    registration: UseFormRegisterReturn;
    error?: string;
}

const SelectInput = ({ input, registration, error }: TableInputProps) => {
    if (input.type !== "select") return null;

    const { container, inputContainer, inputInto, errorStyle } = styles({
        error: !!error,
    });

    return (
        <div className={container}>
            <div className={inputContainer}>
                <select
                    disabled={input.disabled}
                    {...registration}
                    className={inputInto}
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
            </div>
            {error && (
                    <span className={errorStyle}>{error}</span>
                )}
        </div>
    );
};

const TextInput = ({ input, registration, error }: TableInputProps) => {
    const { container, inputContainer, inputInto, errorStyle } = styles({
        error: !!error,
    });

    return (
    <div className={container}>
        <div className={inputContainer}>
            <input
                type={input.type}
                placeholder={input.placeholder}
                disabled={input.disabled}
                className={inputInto}
                {...registration}
            />
        </div>
        {error && (
                    <span className={errorStyle}>{error}</span>
                )}
    </div>
    );
};

const NumberInput = ({ input, registration, error }: TableInputProps) => {
    const { container, inputContainer, inputInto, errorStyle } = styles({
        error: !!error,
    });

    return (
    <div className={container}>
        <div className={inputContainer}>
            <input
                type="number"
                step="any"
                className={inputInto}
                placeholder={input.placeholder}
                disabled={input.disabled}
                {...registration}
            />
        </div>
        {error && (
                <span className={errorStyle}>{error}</span>
            )}
    </div>
    );
};

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
