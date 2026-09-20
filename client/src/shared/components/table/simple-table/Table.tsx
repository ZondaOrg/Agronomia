import TableBase from "../base/TableBase";
import type { Table as TableType } from "@/shared/types/table/Table";

export interface TableProps<T extends Record<string, unknown>> {
    table: TableType<T>;
    nameElements?: string;
    onPageChange?: (newPage: number) => void;
    renderCell?: (value: unknown, key: string, data: T) => React.ReactNode;
    renderRowActions?: (rowId: number, data: T) => React.ReactNode;
}

export const Table = <T extends Record<string, unknown>>({
    table,
    ...rest
}: TableProps<T>) => {
    return (
        <TableBase
            table={table}
            {...rest}
        />
    );
};

export default Table;
