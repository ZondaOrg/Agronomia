import { CLIENTS } from "../urls/clients";
import { PRICE_LIST } from "../urls/products";
import { PROVIDERS } from "../urls/providers";
import { SALE } from "../urls/sale";

export const FACTURACION_ROUTES = {
    BASE: "/facturacion",
    PROVEEDORES: PROVIDERS.BASE,
    CLIENTES: CLIENTS.BASE,
    PRODUCTOS: PRICE_LIST.BASE,
    VENTAS: SALE.BASE,
};
