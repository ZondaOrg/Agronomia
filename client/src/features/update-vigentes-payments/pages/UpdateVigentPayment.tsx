import { useEffect } from "react";
import { useGetPayments } from "@/features/get-vigentes-payments-by-provider/hooks/use-get-vigentes-payments";
import { useParams } from "react-router";
import { UpdatePayments } from "@/features/update-payments/pages/UpdatePayments";
import Spinner from "@/shared/components/spinner/Spinner";
import ComposeForm from "@/shared/components/forms/compose-form/ComposeForm";
import { generatePaymentsSubForms } from "./types/subForms";
import paymentsSchema from "./types/vigent-schema";

export const UpdateVigentPayment = () => {
    const { getPayments, onPageChange, data, isLoading } = useGetPayments();
    const { providerId } = useParams<{ providerId: string }>();

    useEffect(() => {
        if (providerId) {
            getPayments(Number(providerId));
        }
    }, [providerId]);

    if (isLoading || !data) {
        return <h1>No se encontraron pagos</h1>;
    }

    const vigentesPaymentsForm = generatePaymentsSubForms(data);

    return (
        <>
            {isLoading && <Spinner centered />}
            {!isLoading && data && (
                <>
                    <ComposeForm
                        subForms={vigentesPaymentsForm}
                        schema={paymentsSchema}
                        bordered={false}
                        buttonData={{ text: "Guardar listado" }}
                        onSubmit={() => console.log("submit")}
                        onCancel={() => console.log("cancel")}
                    />
                    <UpdatePayments
                        data={data.payments}
                        onPageChange={onPageChange}
                    />
                </>
            )}
            {!isLoading && !data && <h1>No se encontraron pagos</h1>}
        </>
    );
};
