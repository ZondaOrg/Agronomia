import type { TablePaginator } from "@/shared/components/table/types/Table";
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
} from "./style";

interface TableProps<T> extends TablePaginator<T> {
    onPageChange?: (page: number) => void;
    renderCell?: (value: unknown, key: string, data: T) => React.ReactNode;
}

export const Table = <T extends Record<string, unknown>>({
    columns = [],
    rows = [],
    page = 0,
    totalElements = 0,
    totalPages = 0,
    last = true,
    onPageChange,
    renderCell,
}: TableProps<T>) => {
    const hasActions = rows.some((row) => Boolean(row.actions));

    return (
        <div className={tableWrapper}>
            <div className={tableCard}>
                <table className={table}>
                    <thead className={thead}>
                        <tr>
                            {columns.map((col) => (
                                <th
                                    key={col.key}
                                    className={th}
                                >
                                    {col.header}
                                </th>
                            ))}
                            {hasActions && <th className={th}>Acciones</th>}
                        </tr>
                    </thead>
                    <tbody className={tbody}>
                        {rows.map((row) => (
                            <tr
                                key={row.id}
                                className={tr(rows.indexOf(row))}
                            >
                                {columns.map((col) => {
                                    const cellValue = row.data[col.key];

                                    return (
                                        <td
                                            key={col.key}
                                            className={td}
                                        >
                                            {renderCell
                                                ? renderCell(
                                                      cellValue,
                                                      col.key,
                                                      row.data,
                                                  )
                                                : String(cellValue ?? "")}
                                        </td>
                                    );
                                })}

                                {hasActions && (
                                    <td className={tdActions}>
                                        {row.actions ?? null}
                                    </td>
                                )}
                            </tr>
                        ))}
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

export default Table;
