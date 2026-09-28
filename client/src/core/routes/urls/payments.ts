export const PAYMENT = {
    BASE: "formas-de-pago",
    PANEL: "formas-de-pago/:providerId/:providerName",
    PANEL_PATH: (providerId: number, providerName: string) =>
        `formas-de-pago/${providerId}/${encodeURIComponent(providerName)}`,
    UPDATE: "actualizar",
    UPDATE_PATH: (providerId: number) =>
        `formas-de-pago/${providerId}/actualizar`,
};
