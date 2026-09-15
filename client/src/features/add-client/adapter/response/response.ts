import { ClientOption } from "../../../../shared/domain/client/client";
import type { NaturalPersonRequest } from "../request/natural-person";
import type { RazonSocialRequest } from "../request/legal-name";
import type { Client } from "../../domain/client";

type RazonSocialResponse = RazonSocialRequest & {
    type: typeof ClientOption.LEGAL_NAME;
    id: number;
};

type NaturalPersonResponse = NaturalPersonRequest & {
    type: typeof ClientOption.NATURAL_PERSON;
    id: number;
};

export type ClientResponse = RazonSocialResponse | NaturalPersonResponse;

export function clientResponseAdapter(
    response: ClientResponse,
): Client {
    switch (response.type) {
        case ClientOption.NATURAL_PERSON:
            return {
                completeName: {
                    name: response.name,
                    surname: response.surname,
                },
                ...response
            };

        case ClientOption.LEGAL_NAME:
            return {
                completeName: {
                    name: response.associateName,
                    surname: response.associateSurname,
                },
                ...response
            };
    }
}
