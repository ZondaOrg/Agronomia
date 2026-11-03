import { css, cx } from "@styled-system/css";
import type { SystemStyleObject } from "@styled-system/types";
import { styles } from "./styles";
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
import { useRef, useState } from "react";
import type { TextInputData } from "@/shared/types/input/input";
import { fieldStyles } from "../styles";
import { invalidInput } from "../../styles";
import type { InferData, Schema } from "../../shema";

interface FileInputProps<T extends Schema> {
    input: TextInputData;
    inputStyles: SystemStyleObject;
    register: UseFormRegister<InferData<T>>;
    error:
        | FieldError
        | undefined
        | Merge<FieldError, FieldErrorsImpl<DeepRequired<output<T>>>>;
}

function FileInput<T extends Schema>({
    input,
    inputStyles,
    register,
    error,
}: FileInputProps<T>) {
    const [fileName, setFileName] = useState<string>("");
    const inputRef = useRef<HTMLInputElement>(null);

    const { ref, onChange, ...rest } = register(input.name as Path<output<T>>);

    const handleClick = () => {
        inputRef.current?.click();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFileName(e.target.files?.[0]?.name ?? "");
        onChange(e);
    };

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

            <div
                className={cx(css(inputStyles, styles.wrapper), error && invalidInput)}
                onClick={handleClick}
            >
                <span className={css(styles.fileName)}>
                    {fileName || "Ningún archivo seleccionado"}
                </span>
                <span className={css(styles.button)}>Seleccionar archivo</span>
            </div>

            <input
                {...rest}
                ref={(e) => {
                    ref(e);
                    inputRef.current = e;
                }}
                onChange={handleChange}
                type="file"
                id={input.name}
                className={css(styles.hiddenInput)}
            />

            {error && <ErrorMessage message={error.message as string} />}
        </div>
    );
}

export default FileInput;
