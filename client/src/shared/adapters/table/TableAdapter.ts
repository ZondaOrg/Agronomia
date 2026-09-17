import type { Row, TableForm } from "@/shared/types/table/Table";

export class TableAdapter {
    static adapt<T, R>(
        table: TableForm<T>,
        dataMapper?: (item: T) => R,
    ): TableForm<R> {
        const rows: Row<R>[] = table.rows.map((row) => ({
            id: row.id,
            data: dataMapper
                ? dataMapper(row.data)
                : (row.data as unknown as R),
        }));

        return {
            columns: table.columns,
            rows,
            page: table.page,
        };
    }
}
