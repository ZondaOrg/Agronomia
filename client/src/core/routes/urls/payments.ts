export const PAYMENT = {
    PANEL: "formas-de-pago/:providerId/:providerName",
    PANEL_PATH: (providerId: number, providerName: string) =>
        `formas-de-pago/${providerId}/${encodeURIComponent(providerName)}`,
}