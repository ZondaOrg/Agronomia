import TableBase from "../base/TableBase";
import type { TableForm } from "@/shared/types/table/Table";
import { td, tr } from "../base/style";
import { FormTableInput } from "./components/factory";
import Button from "../../button/Button";
import { token } from "@styled-system/tokens";
import { createActionCell } from "../base/actionsFactory";
import type { InputData } from "@/shared/types/input/input";

export interface FormTableProps<T extends Record<string, unknown>> {
    table: TableForm<T>;
    inputs: Record<string, InputData>;
    nameElements?: string;
    draftRow?: Partial<T>;
    onDraftChange?: (draftRow: Partial<T>) => void;
    onAddRow: () => void;
    addLabel?: string;
    onPageChange?: (page: number) => void;
    renderRowActions?: (rowId: number, data: T) => React.ReactNode;
}

export const FormTable = <T extends Record<string, unknown>>({
    table,
    inputs,
    nameElements,
    draftRow,
    onDraftChange,
    onAddRow,
    addLabel = "Añadir registro",
    onPageChange,
    renderRowActions,
}: FormTableProps<T>) => {
    const formColumns = table.columns.map((column) => ({
        ...column,
        input: inputs[column.key],
    }));

    const formTable: TableForm<T> = { ...table, columns: formColumns };

    const draftContent = draftRow ? (
        <tr className={tr(0)}>
            {formColumns.map((column) => {
                const value =
                    draftRow[column.key as keyof T] ??
                    column.input?.defaultValue ??
                    "";

                return (
                    <td
                        key={column.key}
                        className={td}
                    >
                        {column.input && (
                            <FormTableInput
                                input={column.input}
                                value={value}
                                onChange={(nextValue) =>
                                    onDraftChange?.({
                                        ...draftRow,
                                        [column.key]: nextValue,
                                    })
                                }
                            />
                        )}
                    </td>
                );
            })}
            {createActionCell(
                <Button
                    color="white"
                    hoverColor={token("colors.primaryColorHover")}
                    textColor={token("colors.primaryColor")}
                    textHoverColor="white"
                    borderColor={token("colors.primaryColor")}
                    type="button"
                    onClick={onAddRow}
                >
                    {addLabel}
                </Button>,
            )}
        </tr>
    ) : null;

    return (
        <TableBase
            table={formTable}
            nameElements={nameElements}
            onPageChange={onPageChange}
            draftRow={draftContent}
            renderRowActions={renderRowActions}
        />
    );
};
