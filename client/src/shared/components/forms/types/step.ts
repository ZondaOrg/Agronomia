import type { InferData, Schema } from "../validation-form/shema";
import type { SubFormData } from "./sub-form";

export interface OptionForm {
    subType: string
    subforms: SubFormData[]
    schema: Schema
    onSubmit: (data: InferData<Schema>) => void;
}