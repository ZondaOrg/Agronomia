import { useState, useCallback, useMemo } from "react";
import type { Table, Row } from "@/shared/types/table/Table";

export const useDraftRows = <T extends Record<string, unknown>>(
    initialTable?: Table<T>,
    size = 4,
) => {
    const [prevInitialTable, setPrevInitialTable] = useState(initialTable);

    const [deletedIds, setDeletedIds] = useState<number[]>([]);

    const filterDeleted = (rowList: Row<T>[] = []) => {
        return rowList.filter((row) => !deletedIds.includes(row.id));
    };

    const [rows, setRows] = useState<Row<T>[]>(() =>
        filterDeleted(initialTable?.rows),
    );
    const [page, setPage] = useState(initialTable?.page?.page || 0);

    if (initialTable !== prevInitialTable) {
        setPrevInitialTable(initialTable);
        setRows(filterDeleted(initialTable?.rows));
        setPage(initialTable?.page?.page || 0);
    }

    const addDraft = useCallback((data: T) => {
        setRows((prev) => {
            const maxId =
                prev.length > 0 ? Math.max(...prev.map((r) => r.id)) : 0;
            return [...prev, { id: maxId + 1, data }];
        });
    }, []);

    const removeDraft = useCallback((id: number) => {
        setDeletedIds((prev) => [...prev, id]);
        setRows((prev) => prev.filter((row) => row.id !== id));
    }, []);

    const table: Table<T> = useMemo(() => {
        if (
            initialTable &&
            initialTable.page &&
            initialTable.page.totalElements > 0
        ) {
            return {
                columns: initialTable.columns,
                rows: rows,
                page: initialTable.page,
            };
        }

        const totalElements = rows.length;
        const totalPages = Math.max(Math.ceil(totalElements / size), 1);
        const safePage = Math.min(page, totalPages - 1);
        const from = safePage * size;
        const to = from + size;

        return {
            columns: initialTable?.columns || [],
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
    }, [rows, page, size, initialTable, deletedIds]);

    const changePage = useCallback((newPage: number) => {
        setPage(newPage);
    }, []);

    return { table, rows, addDraft, removeDraft, changePage, deletedIds };
};
