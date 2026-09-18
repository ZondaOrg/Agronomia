import { useState } from "react";
import ComposeForm from "@/shared/components/forms/compose-form/ComposeForm";
import { paymentsSubForms } from "./types/subForms";
import paymentsSchema from "./types/vigent-schema";
import { CreatePaymentsTable } from "./components/table/CreatePaymentsTable";
import type { Payment } from "@/features/get-vigentes-payments-by-provider/types/VigentesPayment";
import type { Table } from "@/shared/types/table/Table";

type Props = {
    providerId: number;
};

export const CreateVigentPayment = ({ providerId }: Props) => {
    const [draftPayments, setDraftPayments] = useState<Table<Payment>>();

    const handlePageChange = (page: number) => {
        // acá paginás el draft en memoria (setDraftPayments),
        // ya que todavía no hay nada persistido en el backend
    };

    return (
        <>
            <ComposeForm
                subForms={paymentsSubForms}
                schema={paymentsSchema}
                bordered={false}
                buttonData={{ text: "Guardar listado" }}
                onSubmit={() => console.log("submit", providerId)}
                onCancel={() => console.log("cancel")}
            />
            <CreatePaymentsTable
                data={draftPayments}
                onPageChange={handlePageChange}
            />
        </>
    );
};
