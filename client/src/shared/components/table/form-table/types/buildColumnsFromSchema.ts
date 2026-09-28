import { z } from "zod";
import type { InputData } from "@/shared/types/input/input";

export interface FormColumn {
    key: string;
    header: string;
    input?: InputData;
    [key: string]: unknown;
}

export const buildColumnsFromSchema = <S extends z.ZodObject<z.ZodRawShape>>(
    schema: S,
    inputs: Record<string, InputData>,
): FormColumn[] => {
    return Object.keys(schema.shape).map((key) => {
        const input = inputs[key];
        return {
            key,
            header: input?.title ?? key,
            input,
        };
    });
};
