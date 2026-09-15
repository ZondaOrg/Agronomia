import { useMemo, useState } from "react";
import { FormTable } from "@/shared/components/table/form-table/FormTable";
import { DeleteButton } from "@/shared/components/button/variants/Delete-button";
import {
    initialPaymentDraft,
    initialPaymentRows,
    paymentColumns,
    type PaymentRow,
} from "./types/Table";

export const UpdatePayments = () => {
    const [rows, setRows] = useState(initialPaymentRows);
    const [page, setPage] = useState(0);
    const [draftRow, setDraftRow] =
        useState<Partial<PaymentRow>>(initialPaymentDraft);
    const size = 4;

    const addPayment = () => {
        if (!draftRow.paymentMethod?.trim()) {
            return;
        }

        setRows((currentRows) => [
            ...currentRows,
            {
                id: Date.now(),
                data: {
                    ...initialPaymentDraft,
                    ...draftRow,
                } as PaymentRow,
            },
        ]);
        setDraftRow(initialPaymentDraft);
    };

    const rowsWithActions = useMemo(
        () =>
            rows.map((row) => ({
                ...row,
                actions: (
                    <DeleteButton
                        onClick={() =>
                            setRows((currentRows) =>
                                currentRows.filter(
                                    (currentRow) => currentRow.id !== row.id,
                                ),
                            )
                        }
                    />
                ),
            })),
        [rows],
    );

    const totalPages = Math.max(1, Math.ceil(rows.length / size));
    const currentPage = Math.min(page, totalPages - 1);
    const pageRows = rowsWithActions.slice(
        currentPage * size,
        (currentPage + 1) * size,
    );

    return (
        <FormTable<PaymentRow>
            columns={paymentColumns}
            rows={pageRows}
            nameElements="formas de pago"
            page={currentPage}
            size={size}
            totalElements={rows.length}
            totalPages={totalPages}
            last={page >= totalPages - 1}
            onPageChange={setPage}
            draftRow={draftRow}
            onDraftChange={setDraftRow}
            onAddRow={addPayment}
            addLabel="+ Añadir forma de pago"
        />
    );
};
