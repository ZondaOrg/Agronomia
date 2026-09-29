export const PRODUCTS = {
    BASE: `nuevo-producto/:idProvider/:providerName`,
    PATH: (idProvider: number, providerName: string) =>
        `nuevo-producto/${idProvider}/${encodeURIComponent(providerName)}`,
    ADD: "agregar",
    EDIT: "editar-product/:idProduct",
    EDIT_PATH: (idProduct: number) => `editar-product/${idProduct}`,
};
