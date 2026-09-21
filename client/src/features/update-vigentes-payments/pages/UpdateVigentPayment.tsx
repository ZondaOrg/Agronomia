// features/update-vigentes-payments/UpdateVigentPayment.tsx
import ComposeForm from "@/shared/components/forms/compose-form/ComposeForm";
import { UpdatePayments } from "@/features/update-payments/pages/UpdatePayments";
import { generatePaymentsSubForms } from "./types/subForms";
import paymentsSchema from "./types/vigent-schema";
import type { VigentesPayment } from "@/features/get-vigentes-payments-by-provider/types/VigentesPayment";

type Props = {
    data: VigentesPayment;
    onPageChange: (page: number) => void;
};

export const UpdateVigentPayment = ({ data, onPageChange }: Props) => {
    console.log("Data recibida en UpdateVigentPayment:", data);
    const vigentesPaymentsForm = generatePaymentsSubForms(data);

    return (
        <>
            <ComposeForm
                subForms={vigentesPaymentsForm}
                schema={paymentsSchema}
                buttonData={{ text: "Guardar listado" }}
                onSubmit={() => console.log("submit")}
                onCancel={() => console.log("cancel")}
            />
            <UpdatePayments
                data={data.payments}
                onPageChange={onPageChange}
            />
        </>
    );
};
