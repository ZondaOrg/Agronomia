import useFetch from "@/shared/hooks/use-fetch/useFetch.hook";

import putClient from "../service/put-client.service";
import type { Client } from "../domain/client";
import useNotify from "@/shared/hooks/use-notify/use-notify";
import type { ClientRequest } from "../adapter/request/client";
import type { HttpError } from "@/core/server/errors/http-error";

export const usePutClient = () => {
    const { execute, refresh } = useFetch<Client>();
    const { action, notify, isCancel, handleNotify, handleCancelNotify, init, onDirty } = useNotify();

    async function edit(clientData: ClientRequest, idClient: number) {
        handleNotify(
            clientData, 
            {
                title: "Cliente editado",
                message: (client: Client) => `Se edito el cliente ${client.email}`
            },
            {
                title: "Error Cliente",
                message: (error: HttpError) => error.getMessage
            },
            execute(() => putClient(clientData, idClient))
        )
    }

    const onRefresh = () => {
        refresh()
        init()
    }

    return { isCancel, notify, action, edit, onRefresh, handleCancelNotify, onDirty };
};
