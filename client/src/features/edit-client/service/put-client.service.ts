import http from "@/core/server/http-client";
import { CLIENT_PATH_BY_ID } from "@/core/server/urls/client";
import { clientResponseAdapter, type ClientResponse } from "../adapter/response";
import type { ClientRequest } from "../adapter/request/client";
import { clientRequestAdapter } from "../adapter/request/request";
import type { Client } from "../domain/client";

async function putClient(client: Omit<ClientRequest, "type">, id: number): Promise<Client> {
    const response = await http.put<ClientResponse>(
        CLIENT_PATH_BY_ID(id),
        clientRequestAdapter(client),
        { params: { clientId: id } },
    );

    return clientResponseAdapter(response.data);
}

export default putClient;
