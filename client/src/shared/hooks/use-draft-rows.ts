import { useState, useCallback, useMemo } from "react";
import {
    type Table,
    type Row,
    getEmptyTable,
} from "@/shared/types/table/Table";

export const useDraftRows = <T extends Record<string, unknown>>(
    initialValues: Table<T> = getEmptyTable<T>(),
    size = 4,
) => {
    const [rows, setRows] = useState<Row<T>[]>(() =>
        initialValues.rows.map((row) => ({
            id: row.id,
            data: row.data,
        })),
    );

    const [page, setPage] = useState(0);

    const addDraft = useCallback((data: T) => {
        setRows((prev) => {
            const maxId =
                prev.length > 0 ? Math.max(...prev.map((r) => r.id)) : 0;

            return [
                ...prev,
                {
                    id: maxId + 1,
                    data,
                },
            ];
        });
    }, []);

    const removeDraft = useCallback((id: number) => {
        setRows((prev) => prev.filter((row) => row.id !== id));
    }, []);

    const table: Table<T> = useMemo(() => {
        const totalElements = rows.length;
        const totalPages = Math.max(Math.ceil(totalElements / size), 1);
        const safePage = Math.min(page, totalPages - 1);
        const from = safePage * size;
        const to = from + size;

        return {
            columns: [],
            rows: rows.slice(from, to),
            page: {
                page: safePage,
                size,
                totalElements,
                totalPages,
                first: safePage === 0,
                last: safePage >= totalPages - 1,
            },
        };
    }, [rows, page, size]);

    const changePage = useCallback((newPage: number) => {
        setPage(newPage);
    }, []);

    return { table, rows, addDraft, removeDraft, changePage };
};
