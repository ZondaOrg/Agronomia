import useFetch from "@/shared/hooks/use-fetch/useFetch.hook";
import type { Client } from "../domain/client";
import type { ClientRequest } from "../adapter/request/client";
import useNotify from "@/shared/hooks/use-notify/use-notify";
import type { HttpError } from "@/core/server/errors/http-error";
import addClient from "../services/add-client";

const useAddClient = () => {
    const { execute, refresh } = useFetch<Client>();
    const { action, notify, isCancel, handleNotify, handleCancelNotify, init } = useNotify()

    async function add(clientData: Exclude<ClientRequest, "type">) {
        handleNotify(
            clientData, 
            {
                title: "Cliente agregado",
                message: (client: Client) => `Se registro al cliente ${client.completeName.name} ${client.completeName.surname}`
            },
            {
                title: "Error Cliente",
                message: (error: HttpError) => error.getMessage
            },
            execute(addClient)
        )
    }

    const onRefresh = () => {
        refresh()
        init()
    }

    return { isCancel, notify, action, add, onRefresh, handleCancelNotify };
};

export default useAddClient;
