import ComposeForm from "@/shared/components/forms/compose-form/ComposeForm";
import { paymentsSubForms } from "./types/subForms";
import paymentsSchema from "./types/vigent-schema";
import { CreatePaymentsTable } from "./components/table/CreatePaymentsTable";
import type { Payment } from "@/features/get-vigentes-payments-by-provider/types/VigentesPayment";
import { useDraftRows } from "@/shared/hooks/use-draft-rows";

type Props = {
    providerId: number;
};

export const CreateVigentPayment = ({ providerId }: Props) => {
    const { table, rows, addDraft, removeDraft, changePage } =
        useDraftRows<Payment>();
    const handleSubmit = () => {
        const payments = rows.map((row) => row.data);
        console.log("submit", providerId, payments);
    };

    return (
        <>
            <ComposeForm
                subForms={paymentsSubForms}
                schema={paymentsSchema}
                bordered={false}
                buttonData={{ text: "Guardar listado" }}
                onSubmit={handleSubmit}
                onCancel={() => console.log("cancel")}
            />
            <CreatePaymentsTable
                table={table}
                onAddRow={(data) => addDraft(data as Payment)}
                onRemoveRow={removeDraft}
                onPageChange={changePage}
            />
        </>
    );
};
