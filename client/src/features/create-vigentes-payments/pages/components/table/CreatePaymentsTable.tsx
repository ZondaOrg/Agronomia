import { FormTable } from "@/shared/components/table/form-table/FormTable";
import type { Table } from "@/shared/types/table/Table";
import type * as z from "zod";
import { DeleteButton } from "@/shared/components/button/variants/Delete-button";
import type { Payment } from "@/features/get-vigentes-payments-by-provider/types/VigentesPayment";
import paymentSchema from "./types/payment-schema";
import { paymentInputs } from "./types/Table";

type CreatePaymentsTableProps = {
    onPageChange: (newPage: number) => void;
};

const emptyTable: Table<Payment> = {
    columns: [],
    rows: [],
    page: {
        page: 0,
        size: 4,
        totalElements: 0,
        totalPages: 0,
        first: true,
        last: true,
    },
};

export const CreatePaymentsTable = ({
    onPageChange,
}: CreatePaymentsTableProps) => {
    const handleAddPayment = (validData: z.infer<typeof paymentSchema>) => {
        console.log("Data validada lista para enviar:", validData);
    };

    return (
        <FormTable<Payment, typeof paymentSchema>
            table={emptyTable}
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
