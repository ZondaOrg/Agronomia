import { useEffect } from "react";
import { useParams } from "react-router";
import { useGetPayments } from "@/features/get-vigentes-payments-by-provider/hooks/use-get-vigentes-payments";
import Spinner from "@/shared/components/spinner/Spinner";
import { UpdateVigentPayment } from "@/features/update-vigentes-payments/pages/UpdateVigentPayment";
import { CreateVigentPayment } from "@/features/create-vigentes-payments/pages/CreateVigentPayments";

export const VigentPaymentPage = () => {
    const { getPayments, onPageChange, data, isLoading } = useGetPayments();
    const { providerId } = useParams<{ providerId: string }>();

    useEffect(() => {
        if (providerId) {
            getPayments(Number(providerId));
        }
    }, [providerId]);

    if (isLoading && !data) {
        return <Spinner centered />;
    }

    if (!data) {
        return <CreateVigentPayment providerId={Number(providerId)} />;
    }

    return (
        <UpdateVigentPayment
            vigentId={data.id}
            data={data}
            onPageChange={onPageChange}
        />
    );
};
