import http from "@/core/server/http-client";
import { CLIENT_PATH_BY_ID } from "@/core/server/urls/client";
import { clientResponseAdapter, type ClientResponse } from "../adapter/response";
import type { Client } from "../domain/client";

export const getClientById = async (
    clientId: number,
): Promise<Client> => {
    const response = await http.get<ClientResponse>(
        CLIENT_PATH_BY_ID(clientId),
        { params: { clientId } },
    );
    return clientResponseAdapter(response.data);
};
