import http from "@/core/server/http-client";
import { CLIENT_PATH } from "@/core/server/urls/client";
import type { Client } from "../types/client";
import { clientsListAdapter, type ClientResponse } from "../adapters/response";

export interface ClientFilterPayload {
    type?: ClientTypes | null;
    name?: string;
}

async function getClientsByTypeAndName(
    payload: ClientFilterPayload,
): Promise<Client[]> {
    const response = await http.post<ClientResponse[]>(
        `${CLIENT_PATH}/filter`,
        payload,
    );
    return clientsListAdapter(response.data);
}

export default getClientsByTypeAndName;
