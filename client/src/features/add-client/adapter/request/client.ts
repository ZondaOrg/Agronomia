import type { ClientOption } from "@/shared/domain/client/client";
import type { BASE_CLIENT } from "../api-contract";

export interface ClientRequest {
    [BASE_CLIENT.cuit]: string
    [BASE_CLIENT.location]: string
    [BASE_CLIENT.province]: string
    [BASE_CLIENT.address]?: string
    [BASE_CLIENT.email]?: string | null
    type: ClientOption
}