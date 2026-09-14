import type { ColumnHeader, DataRow, TablePaginator } from "./types/Table";
import {
    tableWrapper,
    tableCard,
    table,
    thead,
    th,
    tbody,
    tr,
    td,
    tdActions,
    pagination,
    paginationButton,
    footerText,
} from "./simple-table/style";

export interface TableBaseProps<T> extends TablePaginator<T> {
    draftRow?: React.ReactNode;
    onPageChange?: (page: number) => void;
    renderCell?: (value: unknown, key: string, data: T) => React.ReactNode;
}

const renderDataRow = <T,>(
    row: DataRow<T>,
    columns: ColumnHeader[],
    index: number,
    renderCell?: TableBaseProps<T>["renderCell"],
) => (
    <tr
        key={row.id}
        className={tr(index)}
    >
        {columns.map((column) => {
            const cellValue = (row.data as Record<string, unknown>)[column.key];

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
        {row.actions && <td className={tdActions}>{row.actions}</td>}
    </tr>
);

export const TableBase = <T extends Record<string, unknown>>({
    columns = [],
    rows = [],
    page = 0,
    totalElements = 0,
    totalPages = 0,
    last = true,
    draftRow,
    onPageChange,
    renderCell,
}: TableBaseProps<T>) => {
    const hasActions = rows.some((row) => Boolean(row.actions));
    const hasDraftActions = Boolean(draftRow);

    return (
        <div className={tableWrapper}>
            <div className={tableCard}>
                <table className={table}>
                    <thead className={thead}>
                        <tr>
                            {columns.map((column) => (
                                <th
                                    key={column.key}
                                    className={th}
                                >
                                    {column.header}
                                </th>
                            ))}
                            {(hasActions || hasDraftActions) && (
                                <th className={th}>Acciones</th>
                            )}
                        </tr>
                    </thead>
                    <tbody className={tbody}>
                        {draftRow}
                        {rows.map((row, index) =>
                            renderDataRow(row, columns, index, renderCell),
                        )}
                    </tbody>
                </table>
            </div>

            {onPageChange && (
                <div className={pagination}>
                    <span className={footerText}>
                        Mostrando {rows.length} de {totalElements} elementos
                    </span>
                    <button
                        className={paginationButton}
                        disabled={page === 0}
                        onClick={() => onPageChange(page - 1)}
                    >
                        Anterior
                    </button>
                    <span className={footerText}>
                        Página {page + 1} de {totalPages}
                    </span>
                    <button
                        className={paginationButton}
                        disabled={last}
                        onClick={() => onPageChange(page + 1)}
                    >
                        Siguiente
                    </button>
                </div>
            )}
        </div>
    );
};

export default TableBase;
