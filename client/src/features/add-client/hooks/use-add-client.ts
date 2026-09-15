import useFetch from "@/shared/hooks/use-fetch/useFetch.hook";
import addClient from "../services/add-client";
import type { Client } from "../domain/client";
import type { ClientRequest } from "../adapter/request/client";

const useAddClient = () => {
    const { error, data, execute, refresh } = useFetch<Client>();

    async function add(clientData: Exclude<ClientRequest, "type">) {
        return await execute(addClient)(clientData);
    }

    return { add, refresh, data, error };
};

export default useAddClient;
