import ComposeForm from "@/shared/components/forms/compose-form/ComposeForm";
import { paymentsSubForms } from "./types/subForms";
import paymentsSchema from "./types/vigent-schema";
import { CreatePaymentsTable } from "./components/table/CreatePaymentsTable";
import type { Payment } from "@/features/get-vigentes-payments-by-provider/types/VigentesPayment";
import { useDraftRows } from "@/shared/hooks/use-draft-rows";
import type { VigentPaymentRequest } from "../adapter/PaymentRequest";
import { useCreateVigentPayments } from "../hook/use-create-vigent-payments";
import Spinner from "@/shared/components/spinner/Spinner";

type Props = {
    providerId: number;
};

export const CreateVigentPayment = ({ providerId }: Props) => {
    const { table, rows, addDraft, removeDraft, changePage } =
        useDraftRows<Payment>();

    const { createVigentPayments, loading, error } = useCreateVigentPayments();

    const onSubmit = (data: Pick<VigentPaymentRequest, "nameList">) => {
        const payload: VigentPaymentRequest = {
            nameList: data.nameList,
            providerId,
            payments: rows.map(({ data: rowData }) => rowData),
        };

        createVigentPayments(payload);
    };

    return (
        <>
            <ComposeForm
                subForms={paymentsSubForms}
                schema={paymentsSchema}
                bordered={false}
                buttonData={{ text: "Guardar listado" }}
                onSubmit={onSubmit}
                onCancel={() => console.log("cancel")}
            />
            <CreatePaymentsTable
                table={table}
                onAddRow={(data) => addDraft(data as Payment)}
                onRemoveRow={removeDraft}
                onPageChange={changePage}
            />
            {loading && <Spinner />}
            {error && <p>Ocurrió un error al guardar el listado.</p>}
        </>
    );
};
