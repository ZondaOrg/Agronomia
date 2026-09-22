import type {
    DeepRequired,
    FieldError,
    FieldErrorsImpl,
    Merge,
    UseFormRegister,
} from "react-hook-form";
import type { InferData, Schema } from "../shema";
import type { output } from "zod";
import type { InputData } from "@/shared/types/input/input";
import SelectInput from "./select/SelectInput";
import FileInput from "./file/FileInput";
import TextInput from "./text/TextInput";
import type { SystemStyleObject } from "@styled-system/types";
import DynamicInput from "./dynamic/DynamicInput";
import CounterCharsInput from "./counter-chars/CounterCharsInput";

export type FieldErrorType<T extends Schema> =
    | FieldError
    | undefined
    | Merge<FieldError, FieldErrorsImpl<DeepRequired<output<T>>>>;

interface RenderInputProps<T extends Schema> {
    input: InputData;
    styles: SystemStyleObject;
    register: UseFormRegister<InferData<T>>;
    error: FieldErrorType<T>;
}

function Input<T extends Schema>({
    input,
    styles,
    register,
    error,
}: RenderInputProps<T>) {
    switch (input.type) {
        case "select":
            return (
                <SelectInput
                    key={input.id}
                    input={input}
                    styles={styles}
                    error={error}
                    register={register}
                />
            );
        case "file":
            return (
                <FileInput
                    key={input.id}
                    input={input}
                    inputStyles={styles}
                    error={error}
                    register={register}
                />
            );
        case "dynamic":
            return (
                <DynamicInput
                    key={input.id}
                    input={input}
                    inputStyles={styles}
                    error={error}
                    register={register}
                />
            );
        case "counter-chars":
            return (
                <CounterCharsInput
                    key={input.id}
                    input={input}
                    inputStyles={styles}
                    error={error}
                    register={register}
                />
            )
        case "text":
        case "email":
        case "password":
            return (
                <TextInput
                    key={input.id}
                    input={input}
                    inputStyles={styles}
                    error={error}
                    register={register}
                />
            );
    }
}

export default Input;
