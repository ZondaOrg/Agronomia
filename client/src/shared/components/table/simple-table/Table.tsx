import type { TableBaseProps } from "../base/TableBase";
import TableBase from "../base/TableBase";

type TableProps<T extends Record<string, unknown>> = TableBaseProps<T>;

export const Table = <T extends Record<string, unknown>>(
    props: TableProps<T>,
) => {
    return <TableBase {...props} />;
};

export default Table;
