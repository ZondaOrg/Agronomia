export const ClientOption = {
    NATURAL_PERSON: 'NATURAL_PERSON',
    LEGAL_NAME: 'RAZON_SOCIAL',
} as const;

export type ClientOption = (typeof ClientOption)[keyof typeof ClientOption];