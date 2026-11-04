import type { InputRow } from "@/shared/types/input/input"
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { InferData, Schema } from "../../shema";
import type { SystemStyleObject } from "@styled-system/types";

export interface SubFormProps<T extends Schema> {
    inputs: InputRow[]
    title?: string
    register: UseFormRegister<InferData<T>>;
    rowStyles: SystemStyleObject
    inputStyles: SystemStyleObject
    errors: FieldErrors<InferData<T>>;
    isLine?: boolean
}
