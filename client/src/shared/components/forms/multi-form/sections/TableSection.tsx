import { forwardRef, useImperativeHandle } from "react";
import type { z } from "zod";
import { useDraftRows } from "@/shared/hooks/use-draft-rows";
import { DeleteButton } from "@/shared/components/button/variants/Delete-button";
import { FormTable } from "@/shared/components/table/form-table/FormTable";
import type { InputData } from "@/shared/types/input/input";
import type { FormSectionHandle } from "../types/FormSection";
import type { Table } from "@/shared/types/table/Table";

interface TableSectionProps<T, S extends z.ZodObject<z.ZodRawShape>> {
    inputs: Record<string, InputData>;
    schema: S;
    nameElements: string;
    addLabel?: string;
    initialValues?: Table<T>;
    onPageChange?: (page: number) => void;
}

function TableSectionInner<
    T extends Record<string, unknown>,
    S extends z.ZodObject<z.ZodRawShape>,
>(
    {
        inputs,
        schema,
        nameElements,
        addLabel,
        initialValues,
        onPageChange,
    }: TableSectionProps<T, S>,
    ref: React.Ref<FormSectionHandle<T[]>>,
) {
    const { table, rows, addDraft, removeDraft, changePage } =
        useDraftRows<T>(initialValues);

    useImperativeHandle(ref, () => ({
        isDirty: () => rows.length > 0,
        isValid: () => true,
        getData: () => rows.map((r) => r.data),
    }));

    const handlePageChange = (newPage: number) => {
        changePage(newPage);
        if (onPageChange) {
            onPageChange(newPage);
        }
    };

    return (
        <FormTable<T, S>
            table={table}
            inputs={inputs}
            schema={schema}
            nameElements={nameElements}
            addLabel={addLabel ?? "Añadir registro"}
            onAddRow={(data) => addDraft(data as T)}
            onPageChange={handlePageChange}
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
    props: TableSectionProps<T, S> & {
        ref?: React.Ref<FormSectionHandle<T[]>>;
    },
) => React.ReactElement;
