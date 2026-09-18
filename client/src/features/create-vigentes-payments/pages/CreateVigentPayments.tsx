// import { useParams } from "react-router";
import ComposeForm from "@/shared/components/forms/compose-form/ComposeForm";
import { paymentsSubForms } from "./types/subForms";
import paymentsSchema from "./types/vigent-schema";
import { CreatePaymentsTable } from "./components/table/CreatePaymentsTable";
import type { Payment } from "@/features/get-vigentes-payments-by-provider/types/VigentesPayment";
import { useState } from "react";
import type { Table } from "@/shared/types/table/Table";

export const UpdateVigentPayment = () => {
    // const { providerId } = useParams<{ providerId: string }>();
    const [draftPayments, setDraftPayments] = useState<Table<Payment>>();

    return (
        <>
            <ComposeForm
                subForms={paymentsSubForms}
                schema={paymentsSchema}
                bordered={false}
                buttonData={{ text: "Guardar listado" }}
                onSubmit={() => console.log("submit")}
                onCancel={() => console.log("cancel")}
            />
            <CreatePaymentsTable
                data={draftPayments}
                onPageChange={onPageChange}
            />
        </>
    );
};
