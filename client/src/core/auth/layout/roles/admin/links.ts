import { ADMIN_ROUTES } from "../../../../routes/admin/paths";
import type { linkNavbar } from "../../components/protected-routes/link";

export const links: linkNavbar[] = [
    { name: "Inicio", path: ADMIN_ROUTES.BASE },
    { name: "Proveedores", path: ADMIN_ROUTES.PROVIDERS.BASE },
    { name: "Clientes", path: ADMIN_ROUTES.CLIENTS.BASE },
    {
        name: "Lista de precios",
        path: `${ADMIN_ROUTES.BASE}/${ADMIN_ROUTES.PRICE_LIST.ROOT.replace(/^\//, "")}`,
    },
    {
        name: "Productos",
        path: `${ADMIN_ROUTES.BASE}/${ADMIN_ROUTES.PRODUCTS.ROOT}`,
    },
    { name: "Ventas", path: ADMIN_ROUTES.SALE.BASE },
];
