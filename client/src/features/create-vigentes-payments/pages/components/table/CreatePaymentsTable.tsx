import { FormTable } from "@/shared/components/table/form-table/FormTable";
import type { Payment } from "@/features/get-vigentes-payments-by-provider/types/VigentesPayment";

import type { Table } from "@/shared/types/table/Table";
import type * as z from "zod";
import { DeleteButton } from "@/shared/components/button/variants/Delete-button";
import { paymentInputs } from "./types/Table";
import paymentSchema from "./types/payment-schema";

type CreatePaymentsTableProps = {
    data?: Table<Payment>;
    onPageChange: (newPage: number) => void;
};

export const CreatePaymentsTable = ({
    onPageChange,
}: CreatePaymentsTableProps) => {
    const handleAddPayment = (validData: z.infer<typeof paymentSchema>) => {
        console.log("Data validada lista para enviar:", validData);
    };

    return (
        <FormTable<Payment, typeof paymentSchema>
            inputs={paymentInputs}
            schema={paymentSchema}
            nameElements="formas de pago"
            onPageChange={onPageChange}
            onAddRow={handleAddPayment}
            addLabel="+ Añadir forma de pago"
            renderRowActions={() => (
                <DeleteButton onClick={() => {} /* onDeleteRow(rowId) */} />
            )}
        />
    );
};
