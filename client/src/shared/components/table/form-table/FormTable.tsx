import TableBase from "../TableBase";
import type { ColumnHeader, TablePaginator } from "../types/Table";
import { td, tdActions, tr } from "../simple-table/style";
import { addButton } from "./style";
import { FormTableInput } from "./components/FormTableInput";
import type { InputType, Option } from "@/shared/types/input/input";

export interface FormColumn extends ColumnHeader {
    inputType: InputType;
    placeholder?: string;
    options?: Option[];
}

export interface FormTableProps<T extends Record<string, unknown>>
    extends Omit<TablePaginator<T>, "columns"> {
    columns: FormColumn[];
    draftRow?: Partial<T>;
    onDraftChange?: (draftRow: Partial<T>) => void;
    onAddRow?: () => void;
    addLabel?: string;
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
                const value = draftRow[column.key];

                return (
                    <td
                        key={column.key}
                        className={td}
                    >
                        <FormTableInput
                            type={column.inputType}
                            value={value}
                            placeholder={column.placeholder}
                            options={column.options}
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
            <td className={tdActions}>
                {onAddRow && (
                    <button
                        className={addButton}
                        type="button"
                        onClick={onAddRow}
                    >
                        + {addLabel}
                    </button>
                )}
            </td>
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