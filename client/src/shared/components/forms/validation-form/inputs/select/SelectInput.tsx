import { css, cx } from "@styled-system/css";
import type { SystemStyleObject } from "@styled-system/types";

import type {
    DeepRequired,
    FieldError,
    FieldErrorsImpl,
    Merge,
    Path,
    UseFormRegister,
} from "react-hook-form";
import type { output } from "zod";
import type { InferData, Schema } from "../../shema";
import type { SelectInputData } from "@/shared/types/input/input";
import ErrorMessage from "../error/ErrorMessage";
import { fieldStyles } from "../styles";
import { invalidInput } from "../../styles";

interface SelectInputProps<T extends Schema> {
    input: SelectInputData;
    styles: SystemStyleObject;
    register: UseFormRegister<InferData<T>>;
    error:
        | FieldError
        | undefined
        | Merge<FieldError, FieldErrorsImpl<DeepRequired<output<T>>>>;
}

function SelectInput<T extends Schema>({
    input,
    styles: inputStyles,
    register,
    error,
}: SelectInputProps<T>) {
    const className = cx(css(inputStyles), error && invalidInput);
    const isSelect = input.type === "select";
    const { container, label } = fieldStyles;

    return (
        <div className={css(container)}>
            <label
                htmlFor={input.name}
                className={css(label)}
            >
                <span>{input.title}</span>
                {input.required && (
                    <span
                        className={css(fieldStyles.required)}
                        aria-hidden="true"
                    >
                        *
                    </span>
                )}
            </label>
            {isSelect ? (
                <select
                    {...register(input.name as Path<output<T>>)}
                    className={className}
                    name={input.name}
                    id={input.name}
                    defaultValue=""
                >
                    <option
                        value=""
                        disabled
                    >
                        {input.placeholder}
                    </option>
                    {input.options?.map((option) => (
                        <option
                            key={option.id}
                            value={option.value}
                        >
                            {option.label}
                        </option>
                    ))}
                </select>
            ) : (
                <input
                    {...register(input.name as Path<output<T>>)}
                    className={className}
                    type={input.type}
                    id={input.name}
                    placeholder={input.placeholder}
                />
            )}
            {error && <ErrorMessage message={error.message as string} />}
        </div>
    );
}

export default SelectInput;
