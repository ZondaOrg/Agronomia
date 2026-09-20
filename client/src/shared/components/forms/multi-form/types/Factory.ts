import type { z } from "zod";
import type { Schema } from "../../validation-form/shema";
import type {
    ComposeSectionConfig,
    TableSectionConfig,
} from "./MultiFormSection";

export function composeSection<S extends Schema>(
    config: Omit<ComposeSectionConfig<S>, "type">,
): ComposeSectionConfig<S> {
    return { type: "compose", ...config };
}

export function tableSection<
    T extends Record<string, unknown>,
    S extends z.ZodObject<z.ZodRawShape>,
>(config: Omit<TableSectionConfig<T, S>, "type">): TableSectionConfig<T, S> {
    return { type: "table", ...config };
}
