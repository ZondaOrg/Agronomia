import type { SubFormData } from "@/shared/components/forms/types/sub-form";

export function withInitialValues(
    subForms: SubFormData[],
    values: Record<string, string>,
): SubFormData[] {
    return subForms.map((subForm) => ({
        ...subForm,
        inputs: subForm.inputs.map((row) =>
            row.map((input) => ({
                ...input,
                defaultValue: values[input.name] ?? "",
            })),
        ),
    }));
}
