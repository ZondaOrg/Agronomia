import type { InferData, Schema } from "./shema";
import type { SubFormData } from "../types/sub-form";
import type { ValidationFormHandleProps } from "./ValidationForm";

export interface InsertFormProps<T extends Schema> {
    subForms: SubFormData[]
    schema: T;
    onSubmit: (data: InferData<T>) => void;
    onCancel: (isCancel: boolean) => void;
    ref?: React.Ref<ValidationFormHandleProps>
}
