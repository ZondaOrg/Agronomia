import type { Ubication } from "../ubication";

export type RazonSocial = {
    id: number;
    cuit: string;
    ubication: Ubication;
    razonSocial: string;
    name: string;
    surname: string;
    associatePhone: string;
    email?: string;
    type: "RAZON_SOCIAL";
};
