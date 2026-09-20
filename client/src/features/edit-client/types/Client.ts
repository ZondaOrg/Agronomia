import type { NaturalPersonSchema } from "../pages/types/natural-person/natural-person-schema";
import type { SocialMotiveSchema } from "../pages/types/social-motive/social-motive-schema";


export type ClientEditSchema = NaturalPersonSchema | SocialMotiveSchema;

export type NaturalClientToEdit = NaturalPersonSchema & {
    id: number;
};

export type LegalClientToEdit = SocialMotiveSchema & {
    id: number;
};

export type ClientToEdit = NaturalClientToEdit | LegalClientToEdit;
