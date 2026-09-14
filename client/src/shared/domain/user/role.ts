export const ROLE = {
    OWNER: "DUENIO",
    BILLING: "FACTURACION",
    SELLER: "VENDEDOR",
    ADMIN: "ADMINISTRADOR",
} as const;

export type Role = (typeof ROLE)[keyof typeof ROLE];
