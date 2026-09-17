import { useGetPayments } from "@/features/get-vigentes-payments-by-provider/hooks/use-get-vigentes-payments";
import { UpdatePayments } from "@/features/update-payments/pages/UpdatePayments";
import { useEffect } from "react";

export const UpdateVigentPayment = () => {
    const { getPayments, data, isLoading } = useGetPayments();

    useEffect(() => {
        getPayments(0, 10, 1);
    }, []);

    return (
        <>
            {isLoading && <p>Cargando...</p>}
            {!isLoading && data && <UpdatePayments data={data} />}
            {!isLoading && !data && <h1>No se encontraron pagos</h1>}
        </>
    );
};
