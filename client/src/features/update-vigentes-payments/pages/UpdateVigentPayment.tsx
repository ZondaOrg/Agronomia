import { useEffect } from "react";
import { useGetPayments } from "@/features/get-vigentes-payments-by-provider/hooks/use-get-vigentes-payments";
import { useParams } from "react-router";
import { UpdatePayments } from "@/features/update-payments/pages/UpdatePayments";
import Spinner from "@/shared/components/spinner/Spinner";

export const UpdateVigentPayment = () => {
    const { providerId } = useParams<{ providerId: string }>();

    const { getPayments, onPageChange, data, isLoading } = useGetPayments();

    const parsedProviderId =
        providerId && !isNaN(Number(providerId)) ? Number(providerId) : null;

    useEffect(() => {
        if (parsedProviderId === null) return;

        getPayments(parsedProviderId);
    }, [parsedProviderId]);

    return (
        <>
            {isLoading && <Spinner centered />}
            {!isLoading && data && (
                <UpdatePayments
                    data={data.payments}
                    onPageChange={onPageChange}
                />
            )}
            {!isLoading && !data && <h1>No se encontraron pagos</h1>}
        </>
    );
};
