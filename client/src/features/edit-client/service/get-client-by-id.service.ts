import http from "@/core/server/http-client";
import { CLIENT_PATH_BY_ID } from "@/core/server/urls/client";
import type { ClientToEdit } from "../types/Client";
import { clientResponseAdapter, type ClientResponse } from "../adapter/response";

export const getClientById = async (
    clientId: number,
): Promise<ClientToEdit> => {
    const response = await http.get<ClientResponse>(
        CLIENT_PATH_BY_ID(clientId),
        { params: { clientId } },
    );
    return clientResponseAdapter(response.data);
};
