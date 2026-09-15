import type { ColumnHeader, DataRow, TablePaginator } from "../types/Table";
import { Pagination } from "../../pagination/Pagination";
import { createActionCell } from "./actionsFactory";
import {
    tableWrapper,
    tableCard,
    table,
    thead,
    th,
    tbody,
    tr,
    td,
    pagination,
    size,
    paginationButton,
} from "./style";

export interface TableBaseProps<T> extends TablePaginator<T> {
    draftRow?: React.ReactNode;
    nameElements: string;
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
        {row.actions && createActionCell(row.actions)}
    </tr>
);

export const TableBase = <T extends Record<string, unknown>>({
    columns = [],
    rows = [],
    page = 0,
    totalElements = 0,
    totalPages = 0,
    draftRow,
    nameElements = "elementos",
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

            {(totalElements > 0 || totalPages > 1) && (
                <footer className={pagination}>
                    <span className={size}>
                        Mostrando {rows.length} de {totalElements}{" "}
                        {nameElements}
                    </span>
                    <div className={paginationButton}>
                        {onPageChange && totalPages > 1 && (
                            <Pagination
                                currentPage={page + 1}
                                totalPages={totalPages}
                                onPageChange={(nextPage) =>
                                    onPageChange(nextPage - 1)
                                }
                            />
                        )}
                    </div>
                </footer>
            )}
        </div>
    );
};

export default TableBase;
