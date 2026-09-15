import type { NaturalPerson } from "../domain/natural-person";
import type { RazonSocial } from "../domain/razon-social";
import type { NaturalPersonSchema } from "../pages/types/natural-person/natural-person-schema";
import type { SocialMotiveSchema } from "../pages/types/social-motive/social-motive-schema";
import { ClientOption } from "../../../shared/domain/client/client";

type RazonSocialResponse = SocialMotiveSchema & {
    type: typeof ClientOption.LEGAL_NAME;
    id: number;
};

type NaturalPersonResponse = NaturalPersonSchema & {
    type: typeof ClientOption.NATURAL_PERSON;
    id: number;
};

export type ClientResponse = RazonSocialResponse | NaturalPersonResponse;

export function clientResponseAdapter(
    response: ClientResponse,
): NaturalPerson | RazonSocial {
    switch (response.type) {
        case ClientOption.NATURAL_PERSON:
            return {
                id: response.id,
                cuit: response.cuit,
                address: response.address,
                location: response.location,
                province: response.province,
                completeName: {
                    name: response.name,
                    surname: response.surname,
                },
                phone: response.phone,
                email: response.email,
            };

        case ClientOption.LEGAL_NAME:
            return {
                id: response.id,
                cuit: response.cuit,
                address: response.address,
                location: response.location,
                province: response.province,
                razonSocial: response.razonSocial,
                associateCompleteName: {
                    name: response.name,
                    surname: response.surname,
                },
                associatePhone: response.phone,
                email: response.email,
            };
    }
}
