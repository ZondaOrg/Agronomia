import type { Row, ColumnHeader } from "@/shared/types/table/Table";
import { tr, td } from "../style";
import { createActionCell } from "../actionsFactory";

interface TableRowProps<T extends Record<string, unknown>> {
    row: Row<T>;
    index: number;
    columns: ColumnHeader[];
    renderCell?: (value: unknown, key: string, data: T) => React.ReactNode;
    renderRowActions?: (rowId: number, data: T) => React.ReactNode;
}

export const TableRow = <T extends Record<string, unknown>>({
    row,
    index,
    columns,
    renderCell,
    renderRowActions,
}: TableRowProps<T>) => {
    return (
        <tr className={tr(index)}>
            {columns.map((column) => {
                const cellValue = (row.data as Record<string, unknown>)[
                    column.key
                ];

                return (
                    <td
                        key={column.key}
                        className={td}
                    >
                        {renderCell
                            ? renderCell(cellValue, column.key, row.data)
                            : String(cellValue ?? "")}
                    </td>
                );
            })}
            {renderRowActions &&
                createActionCell(renderRowActions(row.id, row.data))}
        </tr>
    );
};

export default TableRow;
