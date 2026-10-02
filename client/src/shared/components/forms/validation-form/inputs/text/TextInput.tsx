import { css } from "@styled-system/css";
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

import ErrorMessage from "../error/ErrorMessage";
import type { TextInputData } from "@/shared/types/input/input";
import { fieldStyles } from "../styles";
import type { InferData, Schema } from "../../shema";
import type { NumberInputData } from "@/shared/types/input/number";

interface BasicInputProps<T extends Schema> {
    input: TextInputData | NumberInputData;
    inputStyles: SystemStyleObject;
    register: UseFormRegister<InferData<T>>;
    error:
        | FieldError
        | undefined
        | Merge<FieldError, FieldErrorsImpl<DeepRequired<output<T>>>>;
}

function BasicInput<T extends Schema>({
    input,
    inputStyles,
    register,
    error,
}: BasicInputProps<T>) {
    return (
        <div className={css(fieldStyles.container)}>
            <label
                htmlFor={input.name}
                className={css(fieldStyles.label)}
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
            <input
                {...register(input.name as Path<output<T>>)}
                className={css(inputStyles)}
                type={input.type}
                placeholder={input.placeholder}
                id={input.name}
                disabled={input.disabled}
            />
            {error && <ErrorMessage message={error.message as string} />}
        </div>
    );
}

export default BasicInput;
