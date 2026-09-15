import http from "@/core/server/http-client";
import type { Client } from "../domain/client";
import { clientRequestAdapter } from "../adapter/request";
import { clientResponseAdapter } from "../adapter/response";
import { ADD_CLIENT } from "@/core/server/urls/client";
import type { ClientSchema } from "../adapter/client-schema";

async function addClient(schema: ClientSchema): Promise<Client> {
    const request = await http.post(ADD_CLIENT, clientRequestAdapter(schema));
    return clientResponseAdapter(request.data);
}

export default addClient;