import { forwardRef, useImperativeHandle } from "react";
import type { z } from "zod";
import { useDraftRows } from "@/shared/hooks/use-draft-rows";
import { DeleteButton } from "@/shared/components/button/variants/Delete-button";
import { FormTable } from "@/shared/components/table/form-table/FormTable";
import type { InputData } from "@/shared/types/input/input";
import type { FormSectionHandle } from "../types/FormSection";

interface TableSectionProps<S extends z.ZodObject<z.ZodRawShape>> {
    inputs: Record<string, InputData>;
    schema: S;
    nameElements: string;
    addLabel?: string;
}

function TableSectionInner<
    T extends Record<string, unknown>,
    S extends z.ZodObject<z.ZodRawShape>,
>(
    { inputs, schema, nameElements, addLabel }: TableSectionProps<S>,
    ref: React.Ref<FormSectionHandle<T[]>>,
) {
    const { table, rows, addDraft, removeDraft, changePage } =
        useDraftRows<T>();

    useImperativeHandle(ref, () => ({
        isDirty: () => rows.length > 0,
        isValid: () => true,
        getData: () => rows.map((r) => r.data),
    }));

    return (
        <FormTable<T, S>
            table={table}
            inputs={inputs}
            schema={schema}
            nameElements={nameElements}
            addLabel={addLabel ?? "Añadir registro"}
            onAddRow={(data) => addDraft(data as T)}
            onPageChange={changePage}
            renderRowActions={(rowId) => (
                <DeleteButton onClick={() => removeDraft(rowId)} />
            )}
        />
    );
}

export const TableSection = forwardRef(TableSectionInner) as <
    T extends Record<string, unknown>,
    S extends z.ZodObject<z.ZodRawShape>,
>(
    props: TableSectionProps<S> & { ref?: React.Ref<FormSectionHandle<T[]>> },
) => React.ReactElement;
