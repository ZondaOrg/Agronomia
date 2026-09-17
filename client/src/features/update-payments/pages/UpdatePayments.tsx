import { useState } from "react";
import { FormTable } from "@/shared/components/table/form-table/FormTable";
import { DeleteButton } from "@/shared/components/button/variants/Delete-button";
import type { Payment } from "@/features/get-vigentes-payments-by-provider/types/VigentesPayment";
import paymentSchema from "./types/payment-schema";
import { paymentInputs } from "./types/Table";
import type { TableForm } from "@/shared/types/table/Table";

const initialPaymentDraft: Partial<Payment> = {
    description: "",
    application: "No Aplica",
    percentage: 0,
    bonusPercentage: 0,
};

type UpdatePaymentsProps = {
    data: TableForm<Payment>;
    onPageChange: (newPage: number) => void;
};

export const UpdatePayments = ({ data, onPageChange }: UpdatePaymentsProps) => {
    const [draftRow, setDraftRow] =
        useState<Partial<Payment>>(initialPaymentDraft);

    const addPayment = () => {
        const result = paymentSchema.safeParse(draftRow);

        if (!result.success) {
            // TODO: mostrar errores por campo
            return;
        }

        // onAddRow(result.data as Payment);
        setDraftRow(initialPaymentDraft);
    };

    return (
        <FormTable<Payment>
            table={data}
            inputs={paymentInputs}
            nameElements="formas de pago"
            onPageChange={onPageChange}
            draftRow={draftRow}
            onDraftChange={setDraftRow}
            onAddRow={addPayment}
            addLabel="+ Añadir forma de pago"
            renderRowActions={() => (
                <DeleteButton onClick={() => {} /* onDeleteRow(rowId) */} />
            )}
        />
    );
};
