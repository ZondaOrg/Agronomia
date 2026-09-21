import useFetch from "@/shared/hooks/use-fetch/useFetch.hook";
import createVigentPaymentsService from "../service/create-vigent-payments.service";
import type { VigentesPayment } from "../types/VigentesPayment";
import type { VigentPaymentRequest } from "../adapter/PaymentRequest";
import useNotify from "@/shared/hooks/use-notify/use-notify";
import type { HttpError } from "@/core/server/errors/http-error";

export const useCreateVigentPayments = () => {
    const { execute, refresh } = useFetch<VigentesPayment>();
    const { action, notify, isCancel, handleNotify, handleCancelNotify, init } =
        useNotify();

    async function createVigentPayments(payload: VigentPaymentRequest) {
        handleNotify(
            payload,
            {
                title: "Forma de pago guardada",
                message: () => `Se registró correctamente el listado de pagos.`,
            },
            {
                title: "Error al guardar",
                message: (error: HttpError) => error.getMessage,
            },
            execute(createVigentPaymentsService),
        );
    }

    const onRefresh = () => {
        refresh();
        init();
    };

    return {
        isCancel,
        notify,
        action,
        createVigentPayments,
        onRefresh,
        handleCancelNotify,
    };
};
