import { useState, useCallback, useMemo } from "react";
import type { Table, Row } from "@/shared/types/table/Table";

export const useDraftRows = <T extends Record<string, unknown>>(
    initialTable?: Table<T>,
    size = 4,
    onAutoPageChange?: (page: number) => void,
) => {
    const [prevInitialTable, setPrevInitialTable] = useState(initialTable);
    const [deletedIds, setDeletedIds] = useState<number[]>([]);
    const [addedRows, setAddedRows] = useState<Row<T>[]>([]);
    const [page, setPageState] = useState(initialTable?.page?.page || 0);

    if (initialTable !== prevInitialTable) {
        setPrevInitialTable(initialTable);
        setPageState(initialTable?.page?.page || 0);
    }

    const computeView = useCallback(
        (
            targetPage: number,
            currentDeletedIds: number[],
            currentAddedRows: Row<T>[],
        ) => {
            const currentServerRows = (initialTable?.rows || []).filter(
                (row) => !currentDeletedIds.includes(row.id),
            );

            const orderedAddedRows = [...currentAddedRows].reverse();

            const backendTotalPages = initialTable?.page?.totalPages ?? 1;
            const backendTotalElements =
                initialTable?.page?.totalElements ?? currentServerRows.length;
            const remainingServerElements = Math.max(
                0,
                backendTotalElements - currentDeletedIds.length,
            );

            const totalElements =
                remainingServerElements + orderedAddedRows.length;
            const totalPages = Math.max(Math.ceil(totalElements / size), 1);
            const lastServerPageIndex = Math.max(backendTotalPages - 1, 0);

            let rowsForPage: Row<T>[];

            if (!initialTable || targetPage > lastServerPageIndex) {
                const slotsUsedOnLastServerPage = initialTable
                    ? Math.max(0, size - currentServerRows.length)
                    : 0;
                const virtualPageIndex = initialTable
                    ? targetPage - lastServerPageIndex - 1
                    : targetPage;
                const start =
                    slotsUsedOnLastServerPage + virtualPageIndex * size;
                rowsForPage = orderedAddedRows.slice(start, start + size);
            } else if (targetPage === lastServerPageIndex) {
                const availableSlots = Math.max(
                    0,
                    size - currentServerRows.length,
                );
                rowsForPage = [
                    ...orderedAddedRows.slice(0, availableSlots),
                    ...currentServerRows,
                ];
            } else {
                rowsForPage = currentServerRows;
            }

            return { rows: rowsForPage, totalElements, totalPages };
        },
        [initialTable, size],
    );

    const rawView = useMemo(
        () => computeView(page, deletedIds, addedRows),
        [computeView, page, deletedIds, addedRows],
    );
    const lastPageIndex = Math.max(rawView.totalPages - 1, 0);

    if (page > lastPageIndex) {
        setPageState(lastPageIndex);
    }
    const effectivePage = page > lastPageIndex ? lastPageIndex : page;

    const addDraft = useCallback(
        (data: T) => {
            setAddedRows((prev) => {
                const maxId =
                    prev.length > 0 ? Math.max(...prev.map((r) => r.id)) : 0;
                const baseId = initialTable?.rows.length
                    ? Math.max(...initialTable.rows.map((r) => r.id), 0)
                    : 0;
                const newId = Math.max(maxId, baseId) + 1000;
                return [...prev, { id: newId, data }];
            });
        },
        [initialTable],
    );

    const table: Table<T> = useMemo(() => {
        const { rows, totalElements, totalPages } =
            effectivePage === page
                ? rawView
                : computeView(effectivePage, deletedIds, addedRows);

        return {
            columns: initialTable?.columns || [],
            rows,
            page: {
                page: effectivePage,
                size,
                totalElements,
                totalPages,
                first: effectivePage === 0,
                last: effectivePage >= totalPages - 1,
            },
        };
    }, [
        effectivePage,
        page,
        rawView,
        computeView,
        deletedIds,
        addedRows,
        initialTable,
        size,
    ]);

    const setPage = useCallback(
        (newPage: number, notifyParent = false) => {
            setPageState(newPage);
            if (notifyParent) {
                onAutoPageChange?.(newPage);
            }
        },
        [onAutoPageChange],
    );

    const removeDraft = useCallback(
        (id: number) => {
            const wasServerRow = initialTable?.rows?.some((r) => r.id === id);

            const nextDeletedIds = wasServerRow
                ? [...deletedIds, id]
                : deletedIds;
            const nextAddedRows = wasServerRow
                ? addedRows
                : addedRows.filter((row) => row.id !== id);

            setDeletedIds(nextDeletedIds);
            setAddedRows(nextAddedRows);

            const { rows: futureRows } = computeView(
                effectivePage,
                nextDeletedIds,
                nextAddedRows,
            );

            if (futureRows.length > 0) return;

            const nextPage =
                effectivePage > 0 ? effectivePage - 1 : effectivePage;
            setPage(nextPage, true);
        },
        [
            initialTable,
            deletedIds,
            addedRows,
            effectivePage,
            computeView,
            setPage,
        ],
    );

    const changePage = useCallback(
        (newPage: number) => {
            setPage(Math.max(0, newPage));
        },
        [setPage],
    );

    const resetDraft = useCallback(() => {
        setDeletedIds([]);
        setAddedRows([]);
    }, []);

    return {
        table,
        rows: table.rows,
        addDraft,
        removeDraft,
        changePage,
        deletedIds,
        resetDraft,
    };
};
