import type { Row, ColumnHeader } from "@/shared/types/table/Table";
import { tbody } from "../style";
import TableRow from "./row";

interface TableBodyProps<T extends Record<string, unknown>> {
    rows: Row<T>[];
    columns: ColumnHeader[];
    draftRow?: React.ReactNode;
    renderCell?: (value: unknown, key: string, data: T) => React.ReactNode;
    renderRowActions?: (rowId: number, data: T) => React.ReactNode;
}

export const TableBody = <T extends Record<string, unknown>>({
    rows,
    columns,
    draftRow,
    renderCell,
    renderRowActions,
}: TableBodyProps<T>) => {
    return (
        <tbody className={tbody}>
            {draftRow}
            {rows.map((row, index) => (
                <TableRow
                    key={row.id}
                    row={row}
                    index={index}
                    columns={columns}
                    renderCell={renderCell}
                    renderRowActions={renderRowActions}
                />
            ))}
        </tbody>
    );
};

export default TableBody;
