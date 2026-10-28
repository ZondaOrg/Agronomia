import { useState } from "react";
import useFetch from "@/shared/hooks/use-fetch/useFetch.hook";
import type { Client } from "../domain/client";
import type { ClientRequest } from "../adapter/request/client";
import useNotify from "@/shared/hooks/use-notify/use-notify";
import type { HttpError } from "@/core/server/errors/http-error";
import addClient from "../services/add-client";

export default function useAddClient() {
    const { execute, refresh } = useFetch<Client>();
    const { action, notify, isCancel, handleNotify, handleCancelNotify, init } =
        useNotify();

    // Guardamos el objeto cliente completo
    const [newClient, setNewClient] = useState<Client | null>(null);

    async function add(clientData: Exclude<ClientRequest, "type">) {
        const executeAndCapture = async (data: typeof clientData) => {
            const response = await execute(addClient)(data);

            if (response) {
                setNewClient(response);
            }

            return response;
        };

        handleNotify(
            clientData,
            {
                title: "Cliente agregado",
                message: (client: Client) =>
                    `Se registro al cliente ${client.completeName.name} ${client.completeName.surname}`,
            },
            {
                title: "Error Cliente",
                message: (error: HttpError) => error.getMessage,
            },
            executeAndCapture,
        );
    }

    const onRefresh = () => {
        refresh();
        init();
        setNewClient(null);
    };

    return {
        isCancel,
        notify,
        action,
        add,
        onRefresh,
        handleCancelNotify,
        newClient,
    };
}
