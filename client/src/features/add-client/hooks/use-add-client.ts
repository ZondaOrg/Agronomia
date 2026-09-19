import useFetch from "@/shared/hooks/use-fetch/useFetch.hook";
import addClient from "../services/add-client";
import type { Client } from "../domain/client";
import type { ClientRequest } from "../adapter/request/client";
import useNotify from "@/shared/hooks/use-notify";

const useAddClient = () => {
    const { error, execute, refresh } = useFetch<Client>();
    const { notify, action, handleNotify, stop, init } = useNotify();

    async function add(clientData: Exclude<ClientRequest, "type">) {
        const client = await execute(addClient)(clientData);
        handleNotify(client, successNotify, errorNotify)
    }

    const successNotify = (client: Client) => {
        return {
            toast: {
                title: "Cliente Agregado",
                message: `El cliente ${client.completeName.name} ${client.completeName.surname} fue agregado`
            },
            modal: {
                title: "cliente agregado",
                message: `El cliente ${client.completeName.name} ${client.completeName.surname} fue agregado`
            }
        }
    }

    const errorNotify = () => {
        return {
            toast: {
                title: "",
                message: error ? error.message : "Error al crear el cliente"
            }
        }
    }

    const onRefresh = () => {
        refresh()
        init()
    }

    return { notify, action, add, stop, onRefresh };
};

export default useAddClient;
