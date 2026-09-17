import type { InputData } from "@/shared/types/input/input";

export function buildTableDefaultValues(
    columns: Array<{ key: string; input?: InputData; [key: string]: unknown }>,
) {
    const defaults: Record<string, unknown> = {};
    columns.forEach((column) => {
        if (column.input?.defaultValue !== undefined) {
            defaults[column.key] = column.input.defaultValue;
        } else {
            defaults[column.key] = "";
        }
    });
    return defaults;
}
