import { useState } from "react";
import { FormTable } from "@/shared/components/table/form-table/FormTable";
import { DeleteButton } from "@/shared/components/button/variants/Delete-button";
import {
    initialPaymentDraft,
    initialPaymentRows,
    paymentColumns,
    type PaymentRow,
} from "../types/Table";

export const UpdatePayments = () => {
    const [rows, setRows] = useState(initialPaymentRows);
    const [draftRow, setDraftRow] =
        useState<Partial<PaymentRow>>(initialPaymentDraft);

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

    const rowsWithActions = rows.map((row) => ({
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
    }));

    return (
        <FormTable<PaymentRow>
            columns={paymentColumns}
            rows={rowsWithActions}
            page={0}
            size={10}
            totalElements={rows.length}
            totalPages={1}
            last
            draftRow={draftRow}
            onDraftChange={setDraftRow}
            onAddRow={addPayment}
            addLabel="Añadir forma de pago"
        />
    );
};
