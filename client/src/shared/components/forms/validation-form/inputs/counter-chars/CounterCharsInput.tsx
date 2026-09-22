import type { CounterCharsData } from "@/shared/types/input/counter-chars";
import type { SystemStyleObject } from "@styled-system/types";
import type { DeepRequired, FieldError, FieldErrorsImpl, Merge, Path, UseFormRegister } from "react-hook-form";
import type { InferData, Schema } from "../../shema";
import type { output } from "zod";
import { css } from "@styled-system/css";
import { fieldStyles } from "../styles";
import ErrorMessage from "../error/ErrorMessage";
import { container, counter } from "./styles";
import { useState } from "react";

interface TextInputProps<T extends Schema> {
    input: CounterCharsData;
    inputStyles: SystemStyleObject;
    register: UseFormRegister<InferData<T>>;
    error:
        | FieldError
        | undefined
        | Merge<FieldError, FieldErrorsImpl<DeepRequired<output<T>>>>;
}

function CounterCharsInput<T extends Schema>({
    input,
    inputStyles,
    register,
    error,
}: TextInputProps<T>) {
    const [value, setValue] = useState("");

    function handleCharCounter(e: React.ChangeEvent<HTMLTextAreaElement>) {
        setValue(e.target.value);
    }
    const charCount = value.length;
    const isValid = charCount <= input.limit

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
            <textarea
                {...register(input.name as Path<output<T>>)}
                className={container(inputStyles)}
                placeholder={input.placeholder}
                id={input.name}
                disabled={input.disabled}
                onChange={handleCharCounter}
            />
            <div>
                {error && <ErrorMessage message={error.message as string} />}
                <span className={counter(isValid)}>{`${charCount} / ${input.limit}`}</span>
            </div>
        </div>
    )
}

export default CounterCharsInput;