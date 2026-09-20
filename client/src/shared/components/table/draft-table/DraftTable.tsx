import { useEffect } from "react";
import type { z } from "zod";
import { useDraftRows } from "@/shared/hooks/use-draft-rows";
import { DeleteButton } from "@/shared/components/button/variants/Delete-button";
import { FormTable } from "../form-table/FormTable";
import type { FormTableProps } from "../form-table/types/ValidationForm";

type DraftTableConfig<
    T extends Record<string, unknown>,
    S extends z.ZodObject<z.ZodRawShape>,
> = Pick<
    FormTableProps<T, S>,
    "inputs" | "schema" | "nameElements" | "addLabel"
>;

export function createDraftTable<
    T extends Record<string, unknown>,
    S extends z.ZodObject<z.ZodRawShape>,
>(config: DraftTableConfig<T, S>) {
    return function DraftTable({
        withPayments,
        submitRef,
    }: {
        withPayments: (rows: T[]) => (rest: { nameList: string }) => void;
        submitRef: React.MutableRefObject<(rest: { nameList: string }) => void>;
    }) {
        const { table, rows, addDraft, removeDraft, changePage } =
            useDraftRows<T>();

        useEffect(() => {
            submitRef.current = withPayments(rows.map((r) => r.data));
        }, [rows, withPayments]);

        return (
            <FormTable<T, S>
                table={table}
                inputs={config.inputs}
                schema={config.schema}
                nameElements={config.nameElements}
                addLabel={config.addLabel}
                onAddRow={(data) => addDraft(data as T)}
                onPageChange={changePage}
                renderRowActions={(rowId) => (
                    <DeleteButton onClick={() => removeDraft(rowId)} />
                )}
            />
        );
    };
}
