import useFetch from "@/shared/hooks/use-fetch/useFetch.hook";
import type { VigentesPayment } from "../types/VigentesPayment";
import useNotify from "@/shared/hooks/use-notify/use-notify";
import type { HttpError } from "@/core/server/errors/http-error";
import type { vigentUpdateRequest } from "../adapter/VigentRequest";
import updateVigentPaymentsService from "../services/update-vigent-payments.service";

export const useCreateVigentPayments = () => {
    const { execute, refresh } = useFetch<VigentesPayment>();
    const { action, notify, isCancel, handleNotify, handleCancelNotify, init } =
        useNotify();

    async function createVigentPayments(payload: vigentUpdateRequest) {
        handleNotify(
            payload,
            {
                title: "Forma de pago actualizada",
                message: () =>
                    `Se actualizo correctamente el listado de pagos.`,
            },
            {
                title: "Error al guardar",
                message: (error: HttpError) => error.getMessage,
            },
            execute(updateVigentPaymentsService),
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
