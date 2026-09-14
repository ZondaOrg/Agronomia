export const VENDEDOR_ROUTES = {
    BASE: "/vendedor",
    CONFIGURATION: `configuration`,
    PROVEEDORES: `proveedores`,
    CLIENTES: `clientes`,
    PRODUCTOS: `productos`,
    PAYMENT_PANEL: "formas-de-pago/:providerId/:providerName",
    PAYMENT_PANEL_PATH: (providerId: number, providerName: string) =>
        `formas-de-pago/${providerId}/${encodeURIComponent(providerName)}`,
    VENTAS: `ventas`,
    EDIT_CLIENT: `editar-cliente/:clientId`,
};
