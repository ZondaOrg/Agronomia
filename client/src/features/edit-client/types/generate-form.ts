import { ClientOption } from "@/shared/domain/client/client";
import type { Client } from "../domain/client";
import { generateNaturalPersonSubForms } from "./natural-person/subforms";
import { generateSocialMotiveSubForms } from "./social-motive/subforms";

export function generateForm(client: Client) {
    switch(client.type) {
        case ClientOption.NATURAL_PERSON: return generateNaturalPersonSubForms(client)
        case ClientOption.LEGAL_NAME:     return generateSocialMotiveSubForms(client)
    }
}