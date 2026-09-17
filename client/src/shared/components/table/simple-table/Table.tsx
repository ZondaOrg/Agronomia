import TableBase from "../base/TableBase";
import type { ColumnHeader, Row } from "@/shared/types/table/Table";

export interface TableProps<T extends Record<string, unknown>> {
    columns: ColumnHeader[];
    rows: Row<T>[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    last: boolean;
    first?: boolean;
    nameElements?: string;
    onPageChange?: (newPage: number) => void;
    renderCell?: (value: unknown, key: string, data: T) => React.ReactNode;
    renderRowActions?: (rowId: number, data: T) => React.ReactNode;
}

export const Table = <T extends Record<string, unknown>>({
    columns,
    rows,
    page,
    size,
    totalElements,
    totalPages,
    last,
    first = false,
    ...rest
}: TableProps<T>) => {
    return (
        <TableBase
            columns={columns}
            rows={rows}
            page={{ page, size, totalElements, totalPages, last, first }}
            {...rest}
        />
    );
};

export default Table;
