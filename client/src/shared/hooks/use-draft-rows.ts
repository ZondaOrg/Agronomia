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
    const [page, setPage] = useState(initialTable?.page?.page || 0);

    // Solo sincronizamos la página visible con la que viene del backend.
    // NO tocamos deletedIds/addedRows acá: el draft debe sobrevivir a los refetch de paginación.
    if (initialTable !== prevInitialTable) {
        setPrevInitialTable(initialTable);
        setPage(initialTable?.page?.page || 0);
    }

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
        const currentServerRows = (initialTable?.rows || []).filter(
            (row) => !deletedIds.includes(row.id),
        );
        const combinedRows = [...currentServerRows, ...addedRows];

        const pageMeta = initialTable?.page ?? {
            page,
            size,
            totalElements: combinedRows.length,
            totalPages: 1,
            first: page === 0,
            last: true,
        };

        return {
            columns: initialTable?.columns || [],
            rows: combinedRows,
            page: pageMeta,
        };
    }, [initialTable, deletedIds, addedRows, page, size]);

    const removeDraft = useCallback(
        (id: number) => {
            const wasServerRow = initialTable?.rows?.some((r) => r.id === id);

            if (wasServerRow) {
                setDeletedIds((prev) => [...prev, id]);
            }
            setAddedRows((prev) => prev.filter((row) => row.id !== id));

            const remainingOnPage = table.rows.length - 1;
            if (remainingOnPage > 0) return;

            const totalPages = initialTable?.page?.totalPages ?? 1;
            const nextPage = page > 0 ? page - 1 : page;

            if (nextPage !== page || totalPages > 0) {
                setPage(nextPage);
                onAutoPageChange?.(nextPage);
            }
        },
        [initialTable, table.rows.length, page, onAutoPageChange],
    );

    const changePage = useCallback((newPage: number) => {
        setPage(Math.max(0, newPage));
    }, []);

    // 👇 Nuevo: el padre lo llama explícitamente cuando el draft deja de ser válido
    // (ej: después de "Guardar cambios" con éxito, o al "Cancelar")
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
        resetDraft, // 👈 exponerlo
    };
};
