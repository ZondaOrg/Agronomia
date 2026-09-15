import type { LegalEditRequest } from "../../api/dto/request/legalEditRequest";
import type { NaturalEditRequest } from "../../api/dto/request/naturalEditRequest";
import type { ClientToEdit } from "../../types/Client";
import { ClientOption } from "@/shared/domain/client/client";

export type ClientEditRequest = NaturalEditRequest | LegalEditRequest;

export function clientRequestAdapter(client: ClientToEdit): ClientEditRequest {
    if ("razonSocial" in client) {
        return {
            type: ClientOption.LEGAL_NAME,
            associateName: client.name,
            associateSurname: client.surname,
            associatePhone: client.phone,
            email: client.email ?? "",
            address: client.address ?? "",
            locate: client.location,
            province: client.province,
        };
    }

    return {
        type: ClientOption.NATURAL_PERSON,
        phoneNumber: client.phone,
        email: client.email ?? "",
        address: client.address ?? "",
        locate: client.location,
        province: client.province,
    };
}
