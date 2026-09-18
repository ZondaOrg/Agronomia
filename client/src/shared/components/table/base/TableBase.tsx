import { tableWrapper, tableCard, table as tableStyle } from "./style";
import TableHeader from "./components/header";
import TableBody from "./components/body";
import TableFooter from "./components/footer";
import type { Table } from "@/shared/types/table/Table";

export interface TableBaseProps<T extends Record<string, unknown>> {
    table: Table<T>;
    nameElements?: string;
    draftRow?: React.ReactNode;
    onPageChange?: (page: number) => void;
    renderCell?: (value: unknown, key: string, data: T) => React.ReactNode;
    renderRowActions?: (rowId: number, data: T) => React.ReactNode;
}

export const TableBase = <T extends Record<string, unknown>>({
    table,
    nameElements = "elementos",
    draftRow,
    onPageChange,
    renderCell,
    renderRowActions,
}: TableBaseProps<T>) => {
    const { columns = [], rows = [], page } = table;
    const showActionsColumn = Boolean(renderRowActions) || Boolean(draftRow);

    return (
        <div className={tableWrapper}>
            <div className={tableCard}>
                <table className={tableStyle}>
                    <TableHeader
                        columns={columns}
                        showActionsColumn={showActionsColumn}
                    />
                    <TableBody
                        rows={rows}
                        columns={columns}
                        draftRow={draftRow}
                        renderCell={renderCell}
                        renderRowActions={renderRowActions}
                    />
                </table>
            </div>

            {page && (
                <TableFooter
                    page={page}
                    rowsShown={rows.length}
                    nameElements={nameElements}
                    onPageChange={onPageChange}
                />
            )}
        </div>
    );
};

export default TableBase;
