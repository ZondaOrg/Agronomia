import { CLIENTS } from "../urls/clients";
import { CONFIGURATION } from "../urls/configuration";
import { PAYMENT } from "../urls/payments";
import { PRICE_LIST, PRODUCTS } from "../urls/products";
import { PROVIDERS } from "../urls/providers";
import { SALE } from "../urls/sale";

export const VENDEDOR_ROUTES = {
    BASE: "/vendedor",
    CONFIGURATION: CONFIGURATION.BASE,
    PROVIDERS: {
        BASE: PROVIDERS.BASE,
    },
    CLIENT: {
        BASE: CLIENTS.BASE,
        ADD: CLIENTS.ADD,
        EDIT: CLIENTS.EDIT,
    },
    PRODUCTS: {
        ROOT: PRODUCTS.ROOT,
        BY_TYPE: PRODUCTS.BY_TYPE,
        BASE: PRICE_LIST.BASE,
    },
    PAYMENT: {
        PANEL: PAYMENT.PANEL,
        PANEL_PATH: PAYMENT.PANEL_PATH,
    },
    SALES: {
        BASE: SALE.BASE,
    },
};
