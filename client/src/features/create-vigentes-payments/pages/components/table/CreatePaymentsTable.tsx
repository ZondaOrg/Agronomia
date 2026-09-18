import { FormTable } from "@/shared/components/table/form-table/FormTable";
import type { Table } from "@/shared/types/table/Table";
import type * as z from "zod";
import { DeleteButton } from "@/shared/components/button/variants/Delete-button";
import type { Payment } from "@/features/get-vigentes-payments-by-provider/types/VigentesPayment";
import paymentSchema from "./types/payment-schema";
import { paymentInputs } from "./types/Table";

type CreatePaymentsTableProps = {
    table: Table<Payment>;
    onAddRow: (data: z.infer<typeof paymentSchema>) => void;
    onRemoveRow: (rowId: number) => void;
    onPageChange: (newPage: number) => void;
};

export const CreatePaymentsTable = ({
    table,
    onAddRow,
    onRemoveRow,
    onPageChange,
}: CreatePaymentsTableProps) => {
    return (
        <FormTable<Payment, typeof paymentSchema>
            table={table}
            inputs={paymentInputs}
            schema={paymentSchema}
            nameElements="formas de pago"
            onPageChange={onPageChange}
            onAddRow={onAddRow}
            addLabel="+ Añadir forma de pago"
            renderRowActions={(rowId) => (
                <DeleteButton onClick={() => onRemoveRow(rowId)} />
            )}
        />
    );
};
