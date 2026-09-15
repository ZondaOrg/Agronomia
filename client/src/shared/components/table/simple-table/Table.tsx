import type { TablePaginator } from "@/shared/components/table/types/Table";
import TableBase from "../factory/TableBase";

interface TableProps<T> extends TablePaginator<T> {
    onPageChange?: (page: number) => void;
    renderCell?: (value: unknown, key: string, data: T) => React.ReactNode;
}

export const Table = <T extends Record<string, unknown>>({
    ...props
}: TableProps<T>) => {
    return <TableBase {...props} />;
};

export default Table;
