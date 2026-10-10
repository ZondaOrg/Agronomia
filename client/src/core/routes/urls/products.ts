export const PRICE_LIST = {
    ROOT: "/lista-precios",
    BASE: `lista-precios/:idProvider/:providerName`,
    PATH: (idProvider: number, providerName: string) =>
        `lista-precios/${idProvider}/${encodeURIComponent(providerName)}`,
    ADD: "agregar",
    EDIT: "editar-product/:idProduct",
    EDIT_PATH: (idProduct: number) => `editar-product/${idProduct}`,
};

export const PRODUCTS = {
    ROOT: "productos",
    BY_TYPE: ":typeId/:typeName",
};
