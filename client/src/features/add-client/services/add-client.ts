import http from "@/core/server/http-client";
import type { Client } from "../domain/client";
import { clientRequestAdapter } from "../adapter/request/request";
import { clientResponseAdapter } from "../adapter/response/response";
import { ADD_CLIENT } from "@/core/server/urls/client";
import type { ClientRequest } from "../adapter/request/client";

async function addClient(clientRequest: Exclude<ClientRequest, "type">): Promise<Client> {
    const request = await http.post(ADD_CLIENT, clientRequestAdapter(clientRequest));
    return clientResponseAdapter(request.data);
}

export default addClient;