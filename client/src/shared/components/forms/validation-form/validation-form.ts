import type { InferData, Schema } from "./shema";
import type { SubFormData } from "../types/sub-form";

export interface ValidationFormProps<T extends Schema> {
    subForms: SubFormData[]
    schema: T;
    onSubmit: (data: InferData<T>) => void;
    onDirty: () => void
}
