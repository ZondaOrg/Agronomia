import TableBase from "../factory/TableBase";
import type { ColumnHeader, TablePaginator } from "../types/Table";
import { td, tr } from "../factory/style";
import { FormTableInput } from "./components/factory";
import Button from "../../button/Button";
import { token } from "@styled-system/tokens";
import { createActionCell } from "../factory/actionsFactory";
import type { InputData } from "@/shared/types/input/input";

export interface FormColumn extends ColumnHeader {
    input: InputData;
}

export interface FormTableProps<T extends Record<string, unknown>> extends Omit<
    TablePaginator<T>,
    "columns"
> {
    columns: FormColumn[];
    draftRow?: Partial<T>;
    onDraftChange?: (draftRow: Partial<T>) => void;
    onAddRow: () => void;
    addLabel?: string;
    onPageChange?: (page: number) => void;
}

export const FormTable = <T extends Record<string, unknown>>({
    columns,
    rows,
    draftRow,
    onDraftChange,
    onAddRow,
    addLabel = "Añadir registro",
    ...tableProps
}: FormTableProps<T>) => {
    const draftContent = draftRow ? (
        <tr className={tr(0)}>
            {columns.map((column) => {
                const value =
                    draftRow[column.key] ?? column.input.defaultValue ?? "";

                return (
                    <td
                        key={column.key}
                        className={td}
                    >
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
            {...tableProps}
            columns={columns}
            rows={rows}
            draftRow={draftContent}
        />
    );
};
