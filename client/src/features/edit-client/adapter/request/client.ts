import type { ClientOption } from "@/shared/domain/client/client";
import type { EDIT_CLIENT } from "../api-contract";

export interface ClientRequest {
    [EDIT_CLIENT.locate]: string
    [EDIT_CLIENT.province]: string
    [EDIT_CLIENT.address]?: string
    [EDIT_CLIENT.email]?: string | null
    type: ClientOption
}