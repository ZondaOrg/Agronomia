export const PRODUCTS = {
    BASE: `nuevo-producto/:idProvider/:providerName`,
    PATH: (idProvider: number, providerName: string) => 
        `nuevo-producto/${idProvider}/${encodeURIComponent(providerName)}`,
}