import type { z } from "zod";
import type { SubFormData } from "../../types/sub-form";
import type { Schema, InferData } from "../../validation-form/shema";
import type { InputData } from "@/shared/types/input/input";

export type ComposeSectionConfig<S extends Schema> = {
    type: "compose";
    title?: string;
    subtitle?: string;
    subForms: SubFormData[];
    schema: S;
    initialValues?: Partial<InferData<S>>;
};

export type TableSectionConfig<
    T extends Record<string, unknown>,
    S extends z.ZodObject<z.ZodRawShape>,
> = {
    type: "table";
    title?: string;
    subtitle?: string;
    inputs: Record<string, InputData>;
    schema: S;
    nameElements: string;
    addLabel?: string;
    readonly _rowType?: T;
};

export type MultiFormSectionConfig =
    | ComposeSectionConfig<Schema>
    | TableSectionConfig<Record<string, unknown>, z.ZodObject<z.ZodRawShape>>;
